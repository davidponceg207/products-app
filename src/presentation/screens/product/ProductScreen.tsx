import { Button, ButtonGroup, Input, Layout, useTheme } from "@ui-kitten/components"
import { MainLayout } from "../../layouts/MainLayout"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigator"
import { getProductById } from "../../../actions/products/get-product-by-id"
import { useRef } from "react"
import { ScrollView } from "react-native"
import { Gender, Product, Size } from "../../../domain/entities/product"
import { MyIcon } from "../../components/ui/MyIcon"
import { Formik } from "formik"
import { updateCreateProduct } from "../../../actions/products/update-create-product"
import { ProductImages } from "../../components/products/ProductImages"

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

export const ProductScreen = ({route}: Props) => {

    const productIdRef = useRef(route.params.productId);
    const theme = useTheme();
    const queryClient = useQueryClient();

    const {data: product} = useQuery({
        queryKey: ['product', productIdRef.current],
        queryFn: () => getProductById(productIdRef.current),
    })

    const mutation = useMutation({
        mutationFn: (data: Product) => updateCreateProduct({...data, id: productIdRef.current}),
        onSuccess(data: Product) {
            productIdRef.current = data.id;
            queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
            queryClient.invalidateQueries({queryKey: ['product', data.id]});

        }
    })

    if(!product) {
        return (<MainLayout title="Loading..." />)
    }
    return (
        <Formik
            initialValues={product}
            onSubmit={values => mutation.mutate(values)}
        >
            {
                ({handleChange, handleSubmit, values, errors, setFieldValue}) => (

                    <MainLayout title={ values.title } subTitle={`Price: ${values.price}`}>
                        <ScrollView style={{flex: 1}}>

                            {/* Product Images */}
                            <Layout style={{marginVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                                <ProductImages images={values.images} />
                            </Layout>

                            {/* Form */}
                            <Layout style={{ marginHorizontal: 10 }}>
                                <Input
                                    label='Title'
                                    value={ values.title }
                                    style={{marginVertical: 5}}
                                    onChangeText={handleChange('title')}
                                />
                                <Input
                                    label='Slug'
                                    value={ values.slug }
                                    style={{marginVertical: 5}}
                                    onChangeText={handleChange('slug')}
                                />
                                <Input
                                    label='Description'
                                    value={ values.description }
                                    multiline
                                    numberOfLines={5}
                                    style={{marginVertical: 5}}
                                    onChangeText={handleChange('description')}
                                />
                            </Layout>

                            {/* Price and stock */}
                            <Layout style={{
                                marginHorizontal: 15, flexDirection: 'row', gap: 10, marginVertical: 5
                            }}>

                                <Input
                                    label='Precio'
                                    value={ values.price.toString() }
                                    onChangeText={handleChange('price')}
                                    style={{flex: 1}}
                                    keyboardType="numeric"
                                />
                                <Input
                                    label='Stock'
                                    value={ values.stock.toString() }
                                    onChangeText={handleChange('stock')}
                                    style={{flex: 1}}
                                    keyboardType="numeric"

                                />

                            </Layout>

                            {/* Selects */}
                            <ButtonGroup style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }} size="small" appearance="outline">
                                {
                                    sizes.map((size) => (
                                        <Button
                                            key={size}
                                            style={{flex: 1, backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined}}
                                            onPress={() => setFieldValue(
                                                'sizes',
                                                values.sizes.includes(size)
                                                    ? values.sizes.filter(s => s !== size)
                                                    : [...values.sizes, size]
                                            )}
                                        >{size}</Button>
                                    ))
                                }
                            </ButtonGroup>

                            <ButtonGroup style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }} size="small" appearance="outline">
                                {
                                    genders.map((gender) => (
                                        <Button
                                            onPress={() => setFieldValue('gender', gender)}
                                            key={gender}
                                            style={{flex: 1, backgroundColor: values.gender.startsWith(gender) ? theme['color-primary-200'] : undefined}}
                                        >{gender}</Button>
                                    ))
                                }
                            </ButtonGroup>

                            {/* Save button */}
                            <Button accessoryLeft={<MyIcon name="save-outline" white />} style={{margin: 15}} onPress={() => handleSubmit()} disabled={mutation.isPending}>
                                Save
                            </Button>

                            {/* Extra */}
                            {/* <Text style={{ margin: 15 }}>{JSON.stringify(values, null, 2)}</Text> */}

                            <Layout style={{ height: 200 }} />

                        </ScrollView>
                    </MainLayout>

                )
            }


        </Formik>
    )
}