import { useQuery } from '@apollo/client';
import { USER_LOGGED_IN } from '../graphql/queries';

const useReviews = () => {

    const { data, loading, error } = useQuery(USER_LOGGED_IN, {
        fetchPolicy: 'cache-and-network',
        variables: {
            "includeReviews": true
        }
    });

    if (loading) {
        console.log('Loading...');
    }

    if (error) {
        console.error('Apollo error:', error.message);
    }

    console.log('data', data)

    // Ensure that data is available and transform the data into reviews list
    const reviews = data?.me?.reviews?.edges?.map(edge => edge.node) ?? [];

    //console.log('GraphQL repositories data:', repositories);

    console.log('reviews', reviews);

    return { reviews, loading, error };
};

export default useReviews;