import { Text, View } from 'react-native';
import { Product } from '../../../domain/entities/product';

interface Props {
    product: Product;
}

export const ProductCard = ({product}: Props) => {
    return (
        <Text>{product.id}</Text>
    )
}