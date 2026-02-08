import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { API_URL } from '@env';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {

    const { login } = useAuthStore();

    const [isPosting, setIsPosting] = useState(false)

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const { height } = useWindowDimensions();

    const onLogin = async () => {
        if(form.email.length === 0 || form.password.length === 0) {
            return;
        }

        setIsPosting(true);

        const wasSuccessful = await login(form.email, form.password);

        setIsPosting(false);

        if(wasSuccessful) return;

        Alert.alert('Error', 'User or password invalid');
    };

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
                        value={ form.email }
                        onChangeText={(email) => setForm({...form, email})}
                        style={{ marginBottom: 10 }}
                        accessoryLeft={ <MyIcon name='email-outline' /> }
                    />

                    <Input
                        placeholder='password'
                        autoCapitalize='none'
                        secureTextEntry
                        value={ form.password }
                        onChangeText={(password) => setForm({...form, password})}
                        style={{ marginBottom: 10 }}
                        accessoryLeft={ <MyIcon name='lock-outline' /> }
                    />
                </Layout>

                {/* Space */}
                <Layout style={{height: 10}} />

                {/* Button */}
                <Layout>
                    <Button
                        disabled={isPosting}
                        onPress={onLogin}
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