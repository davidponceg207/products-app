import { Button, Icon, Layout } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';

export const HomeScreen = () => {

    const {logout} = useAuthStore();

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Button onPress={logout} accessoryLeft={ <Icon name='log-out-outline' /> }>Logout</Button>
        </Layout>
    )
}