import { View, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
// import Text from './Text';

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        padding: 20,
        justifyContent: 'center'
    },
    field: {
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    }
})

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
        <View style={styles.form}>
            <TextInput
                style={styles.field}
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')} />
            <TextInput
                style={styles.field}
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