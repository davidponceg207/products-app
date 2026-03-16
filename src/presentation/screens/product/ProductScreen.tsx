import { Button, ButtonGroup, Input, Layout, Text, useTheme } from "@ui-kitten/components"
import { MainLayout } from "../../layouts/MainLayout"
import { useQuery } from "@tanstack/react-query"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigator"
import { getProductById } from "../../../actions/products/get-product-by-id"
import { useRef } from "react"
import { FlatList, ScrollView } from "react-native"
import { FadeInImage } from "../../components/ui/FadeInImage"
import { Gender, Size } from "../../../domain/entities/product"
import { MyIcon } from "../../components/ui/MyIcon"

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genres: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

export const ProductScreen = ({route}: Props) => {

    const productIdRef = useRef(route.params.productId);
    const theme = useTheme();

    const {data: product} = useQuery({
        queryKey: ['product', productIdRef.current],
        queryFn: () => getProductById(productIdRef.current),
    })

    if(!product) {
        return (<MainLayout title="Loading..." />)
    }
    return (
        <MainLayout title={ product.title } subTitle={`Price: ${product.price}`}>
            <ScrollView style={{flex: 1}}>

                {/* Product Images */}
                <Layout>
                    <FlatList
                        data={ product.images }
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                            <FadeInImage uri={item} style={{
                                width: 300, height: 300, marginHorizontal: 7
                            }} />
                        )}
                    />
                </Layout>

                {/* Form */}
                <Layout style={{ marginHorizontal: 10 }}>
                    <Input
                        label='Title'
                        value={ product.title }
                        style={{marginVertical: 5}}
                    />
                    <Input
                        label='Slug'
                        value={ product.slug }
                        style={{marginVertical: 5}}
                    />
                    <Input
                        label='Description'
                        value={ product.description }
                        multiline
                        numberOfLines={5}
                        style={{marginVertical: 5}}
                    />
                </Layout>

                {/* Price and stock */}
                <Layout style={{
                    marginHorizontal: 15, flexDirection: 'row', gap: 10, marginVertical: 5
                }}>

                    <Input
                        label='Precio'
                        value={ product.price.toString() }
                        style={{flex: 1}}
                    />
                    <Input
                        label='Stock'
                        value={ product.stock.toString() }
                        style={{flex: 1}}
                    />

                </Layout>

                {/* Selects */}
                <ButtonGroup style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }} size="small" appearance="outline">
                    {
                        sizes.map((size) => (
                            <Button key={size} style={{flex: 1, backgroundColor: true ? theme['color-primary-200'] : undefined}} >{size}</Button>
                        ))
                    }
                </ButtonGroup>

                <ButtonGroup style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }} size="small" appearance="outline">
                    {
                        genres.map((genre) => (
                            <Button key={genre} style={{flex: 1, backgroundColor: true ? theme['color-primary-200'] : undefined}} >{genre}</Button>
                        ))
                    }
                </ButtonGroup>

                {/* Save button */}
                <Button accessoryLeft={<MyIcon name="save-outline" white />} style={{margin: 15}} onPress={() => console.log('Save')}>
                    Save
                </Button>

                {/* Extra */}
                <Text style={{ margin: 15 }}>{JSON.stringify(product, null, 2)}</Text>

                <Layout style={{ height: 200 }} />

            </ScrollView>
        </MainLayout>
    )
}