import { Text, View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Navigate } from 'react-router-native';
import { useMutation, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW, USER_LOGGED_IN } from '../graphql/queries';

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
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginTop: 16
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

const initialValues = {
    ownerName: '',
    rating: '',
    repositoryName: '',
    text: ''
}

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repistory owner name is required'),
    repositoryName: yup
        .string()
        .required('Repistory owner name is required'),
    rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Minimum is 0')
        .max(100, 'Maximum is 100'),
    text: yup
        .string(),
})


export const ReviewForm = ({ onSubmit }) => {

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
                style={[styles.field, formik.touched.ownerName && formik.errors.ownerName && styles.errorField]}
                placeholder='Repistory owner name'
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
                onBlur={formik.handleBlur('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
            )}

            <TextInput
                style={[styles.field, formik.touched.repositoryName && formik.errors.repositoryName && styles.errorField]}
                placeholder='Repistory name'
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
                onBlur={formik.handleBlur('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
            )}

            <TextInput
                style={[styles.field, formik.touched.rating && formik.errors.rating && styles.errorField]}
                placeholder='Rating between 0 and 100'
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
                onBlur={formik.handleBlur('rating')}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.errorText}>{formik.errors.rating}</Text>
            )}

            <TextInput
                style={[styles.field, formik.touched.text && formik.errors.text && styles.errorField]}
                placeholder='Review'
                value={formik.values.text}
                onChangeText={formik.handleChange('text')}
                onBlur={formik.handleBlur('text')}
                multiline
                numberOfLines={4}
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={styles.errorText}>{formik.errors.text}</Text>
            )}


            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
        </View>
    )
}


const CreateReview = () => {

    const { data } = useQuery(USER_LOGGED_IN, {
        fetchPolicy: 'cache-and-network',
    });

    const isLoggedIn = data?.me !== null;

    console.log('isLoggedIn', isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    const navigate = useNavigate();
    const [mutate] = useMutation(CREATE_REVIEW)

    const handleSubmit = async (values) => {
        console.log('Submitted values', values)

        try {
            const { data: { createReview } } = await mutate({
                variables: {
                    review: {
                        ownerName: values.ownerName,
                        repositoryName: values.repositoryName,
                        rating: Number(values.rating),
                        text: values.text,
                    }
                }
            });
            console.log("Review created:", data);
            navigate(`/${createReview.repositoryId}`);
        } catch (e) {
            console.error("Error creating review", e.message);
        }
    }

    return (
        <>
            <ReviewForm onSubmit={handleSubmit} />
        </>
    )
};

export default CreateReview;