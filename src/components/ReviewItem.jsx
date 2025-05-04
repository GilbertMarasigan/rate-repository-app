import { View, Text, StyleSheet, Pressable, Alert } from "react-native"
import { useMutation } from "@apollo/client";
import { formatToMMddyyyy } from '../utils/dateFormatter';
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/queries";

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
    twoButtonContainer: {
        display: 'flex',
        flexDirection: 'row'
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

const buttonStyles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
        paddingBottom: 12,
        backgroundColor: 'white',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    viewButton: {
        backgroundColor: '#007BFF',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})

const ReviewItem = ({ review, view, refetch }) => {

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

        const [deleteReview] = useMutation(DELETE_REVIEW)

        const handleDelete = () => {
            Alert.alert(
                "Delete Review",
                "Are you sure you want to delete this review?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        onPress: async () => {

                            try {
                                await deleteReview({ variables: { deleteReviewId: review.id } })
                                console.log("Confirmed delete");
                                refetch();
                            } catch (error) {
                                console.log('Error deleting review', error)
                            }
                        },
                        style: "destructive"
                    }
                ]
            );
        };
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
                <View style={buttonStyles.buttonContainer}>
                    <Pressable style={[buttonStyles.button, buttonStyles.viewButton]} onPress={() => navigate(`/${review.repository.id}`)}>
                        <Text style={buttonStyles.buttonText}>View Repository</Text>
                    </Pressable>
                    <Pressable style={[buttonStyles.button, buttonStyles.deleteButton]} onPress={handleDelete}>
                        <Text style={buttonStyles.buttonText}>Delete Review</Text>
                    </Pressable>
                </View>
            </>
        )
    }

}

export default ReviewItem