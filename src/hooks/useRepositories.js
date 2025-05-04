import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection }, debouncedSearchQuery) => {
    const { data, loading, error } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            orderBy,
            orderDirection,
            searchKeyword: debouncedSearchQuery
        }
    });

    console.log('debouncedSearchQuery', debouncedSearchQuery)

    if (loading) {
        console.log('Loading...');
    }

    if (error) {
        console.error('Apollo error:', error.message);
    }

    // Ensure that data is available and transform the data into repositories list
    const repositories = data?.repositories?.edges?.map(edge => edge.node) ?? [];

    //console.log('GraphQL repositories data:', repositories);

    return { repositories, loading, error };
};

export default useRepositories;