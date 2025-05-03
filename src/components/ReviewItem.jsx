import { View, Text, StyleSheet, Pressable } from "react-native"
import { formatToMMddyyyy } from '../utils/dateFormatter';
import { useNavigate } from "react-router-native";

const size = 48;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        color: 'red'
    },
    container: {
        padding: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    separator: {
        height: 10,
        backgroundColor: '#bdbdbd'
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        alignItems: 'flex-start',
    },
    scoreCircle: {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        flexShrink: 0,
        flexGrow: 0,
    },
    scoreText: {
        color: '#007BFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    commentContent: {
        flex: 1,
        flexDirection: 'column',
        minWidth: 0,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2,
    },
    date: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 8,
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
        flexShrink: 1,
        flexWrap: 'wrap',
        minWidth: 0,
    },
});

const handleDelete = () => {
    console.log('handleDelete')
}


const ReviewItem = ({ review, view }) => {

    console.log('review', review)

    console.log('view', view)

    if (view === 'singleRepo') {
        return (
            <>
                <View style={styles.itemContainer}>
                    <View style={styles.scoreCircle}>
                        <Text style={styles.scoreText}>{review.rating}</Text>
                    </View>
                    <View style={styles.commentContent}>
                        <Text testID="title" style={styles.username}>
                            {review.user.username}
                        </Text>
                        <Text testID="description" style={styles.date}>
                            {formatToMMddyyyy(review.createdAt)}
                        </Text>
                        <Text testID="language" style={styles.commentText}>
                            {review.text}
                        </Text>
                    </View>
                </View>

            </>
        )
    }
    else {

        const navigate = useNavigate();
        // View for My Reviews
        return (
            <>
                <View style={styles.itemContainer}>
                    <View style={styles.scoreCircle}>
                        <Text style={styles.scoreText}>{review.rating}</Text>
                    </View>
                    <View style={styles.commentContent}>
                        <Text testID="title" style={styles.username}>
                            {review.repository.fullName}
                        </Text>
                        <Text testID="description" style={styles.date}>
                            {formatToMMddyyyy(review.createdAt)}
                        </Text>
                        <Text testID="language" style={styles.commentText}>
                            {review.text}
                        </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Pressable style={styles.button} onPress={() => navigate(`/${review.repository.fullName}`)}>
                        <Text style={styles.buttonText}>View Repository</Text>
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Pressable style={styles.button} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Delete review</Text>
                    </Pressable>
                </View>
            </>
        )
    }

}

export default ReviewItem