import { Button, Icon, Layout } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';

export const HomeScreen = () => {

    const {logout} = useAuthStore();

    getProductsByPage(0)

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Button onPress={logout} accessoryLeft={ <Icon name='log-out-outline' /> }>Logout</Button>
        </Layout>
    )
}