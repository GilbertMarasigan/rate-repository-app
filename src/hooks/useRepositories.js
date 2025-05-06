import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection }, debouncedSearchQuery, first) => {
    const { data, loading, error, fetchMore, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: {
            orderBy,
            orderDirection,
            searchKeyword: debouncedSearchQuery,
            first
        }
    });

    const handleFetchMore = () => {

        console.log('handleFetchMore')
        const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;
        const endCursor = !loading && data?.repositories?.pageInfo?.endCursor

        console.log('canFetchMore:', canFetchMore);
        console.log('endCursor:', data?.repositories?.pageInfo?.endCursor);

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                orderBy,
                orderDirection,
                searchKeyword: debouncedSearchQuery,
                first,
                endCursor: endCursor
            }
        })
    }

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

    return {
        repositories,
        fetchMore: handleFetchMore,
        loading,
        error,
        refetch
    };
};

export default useRepositories;