import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView, useWindowDimensions } from 'react-native';

export const LoginScreen = () => {

    const { height } = useWindowDimensions();

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>

                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Login</Text>
                    <Text category='p2'>Please, login to continue</Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder='email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={{ marginBottom: 10 }}
                    />

                    <Input
                        placeholder='password'
                        autoCapitalize='none'
                        secureTextEntry
                        style={{ marginBottom: 10 }}
                    />
                </Layout>

                {/* Space */}
                <Layout style={{height: 20}} />

                <Layout>
                    <Button onPress={() => {}}>
                        Login
                    </Button>
                </Layout>

                {/* Info */}
                <Layout style={{height: 50}} />

                <Layout style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Text>Don't you have an account?</Text>
                    <Text status='primary' category='s1' onPress={() => {}}>{' '}New account{' '}</Text>
                </Layout>

            </ScrollView>
        </Layout>
    )
}