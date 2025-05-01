import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { CREATE_USER } from '../graphql/queries';
import theme from '../theme/theme';

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
    password: '',
    passwordConfirmation: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirm is required')
})


export const SignUpForm = ({ onSubmit }) => {

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

            <TextInput
                style={[styles.field, formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && styles.errorField]}
                placeholder='Password confirmation'
                value={formik.values.passwordConfirmation}
                secureTextEntry={true}
                onChangeText={formik.handleChange('passwordConfirmation')}
                onBlur={formik.handleBlur('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable style={theme.button} onPress={formik.handleSubmit}>
                <Text style={theme.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    )
}


const SignUp = () => {

    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const [mutate] = useMutation(CREATE_USER)

    const handleSubmit = async (values) => {


        try {
            const { data: { createUser } } = await mutate({
                variables: {
                    user: {
                        username: values.username,
                        password: values.password
                    }
                }
            });
            console.log("Account created:", createUser.username);

            try {
                const token = await signIn(values);
                console.log('Access Token: ', token)
                navigate(`/`);
            } catch (error) {
                console.error('Sign-in failed: ', error.message)
            }

        } catch (e) {
            console.error("Error creating review", e.message);
        }
    }

    return (
        <>
            <SignUpForm onSubmit={handleSubmit} />
        </>
    )
};

export default SignUp;