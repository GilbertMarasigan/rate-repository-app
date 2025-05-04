import { FlatList, View, StyleSheet, Text } from 'react-native';
import ReviewItem from './ReviewItem';
import useReviews from '../hooks/useReviews';

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: '#bdbdbd'
    },
});

const ItemSeparator = () => <View style={styles.separator} />;


export const ReviewList = ({ reviews, refetch }) => {

    if (!reviews) {
        <View><Text>No reviews yet.</Text></View>
    }

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
            keyExtractor={(item) => item.id}
        />
    );
};

const MyReviews = () => {

    const { reviews, refetch } = useReviews();

    return <ReviewList reviews={reviews} refetch={refetch} />;
}

export default MyReviews;