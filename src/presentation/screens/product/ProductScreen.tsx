import { Input, Layout } from "@ui-kitten/components"
import { MainLayout } from "../../layouts/MainLayout"
import { useQuery } from "@tanstack/react-query"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigator"
import { getProductById } from "../../../actions/products/get-product-by-id"
import { useRef } from "react"
import { FlatList, ScrollView } from "react-native"
import { FadeInImage } from "../../components/ui/FadeInImage"

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

export const ProductScreen = ({route}: Props) => {

    const productIdRef = useRef(route.params.productId);

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

                {/*  */}
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

                {/*  */}

                <Layout style={{ height: 200 }} />

            </ScrollView>
        </MainLayout>
    )
}