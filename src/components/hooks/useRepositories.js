import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const { data, loading, error } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) {
        console.log('Loading...');
    }

    if (error) {
        console.error('Apollo error:', error.message);
    }

    console.log('GraphQL data:', JSON.stringify(data, null, 2));

    // Ensure that data is available and transform the data into repositories list
    const repositories = data?.repositories?.edges?.map(edge => edge.node) ?? [];

    return { repositories, loading, error };
};

export default useRepositories;