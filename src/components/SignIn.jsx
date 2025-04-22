import { View, TextInput } from 'react-native';
import { useFormik } from 'formik';
// import Text from './Text';

const initialValues = {
    username: '',
    password: ''
}

const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        onSubmit
    })

    return (
        <View>
            <TextInput
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')} />
            <TextInput
                placeholder='Password'
                value={formik.values.password}
                secureTextEntry={true}
                onChangeText={formik.handleChange('password')} />
        </View>
    )
}

const SignIn = () => {
    return (<SignInForm />
    )
};

export default SignIn;