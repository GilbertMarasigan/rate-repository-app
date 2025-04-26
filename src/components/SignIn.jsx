import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup'
import useSignIn from './hooks/useSignIn';

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
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    errorText: {
        color: "#d73a4a",
        marginVertical: 5
    },
    errorField: {
        borderColor: 'red',
        borderWidth: 2,
    },
})

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required')
})


const SignInForm = ({ onSubmit }) => {

    console.log('test')

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            onSubmit && onSubmit(values)
        }
    })

    return (
        <View style={styles.form}>
            <TextInput
                style={[styles.field, formik.touched.username && formik.errors.username && styles.errorField]}
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={[styles.field, formik.touched.password && formik.errors.password && styles.errorField]}
                placeholder='Password'
                value={formik.values.password}
                secureTextEntry={true}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
            <Button title="Sign In" onPress={formik.handleSubmit} />
        </View>
    )
}


const SignIn = () => {

    const [signIn] = useSignIn();

    const handleSubmit = async (values) => {
        console.log('Submitted vaues', values)

        try {
            const token = await signIn(values);
            console.log('Access Token: ', token)
        } catch (error) {
            console.error('Sign-in failed: ', error.message)
        }
    }


    return (
        <>
            <SignInForm onSubmit={handleSubmit} />
        </>
    )
};

export default SignIn;