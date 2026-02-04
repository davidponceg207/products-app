import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';

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
                        accessoryLeft={ <MyIcon name='email-outline' /> }
                    />

                    <Input
                        placeholder='password'
                        autoCapitalize='none'
                        secureTextEntry
                        style={{ marginBottom: 10 }}
                        accessoryLeft={ <MyIcon name='lock-outline' /> }
                    />
                </Layout>

                {/* Space */}
                <Layout style={{height: 10}} />

                {/* Button */}
                <Layout>
                    <Button
                        onPress={() => {}}
                        accessoryRight={ <MyIcon name='arrow-forward-outline' white/> }
                    >
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