import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { API_URL } from '@env';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {

    const { height } = useWindowDimensions();

    console.log({apiUrl: API_URL})

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>

                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Login</Text>
                    <Text category='p2'>Please, log in to continue</Text>
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
                        Log in
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
                    <Text status='primary' category='s1' onPress={() => navigation.navigate('RegisterScreen')}>{' '}New account{' '}</Text>
                </Layout>

            </ScrollView>
        </Layout>
    )
}