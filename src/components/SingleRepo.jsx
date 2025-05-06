import { View, Text, ActivityIndicator, StyleSheet, Pressable, Linking, AppState, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { SINGLE_REPO } from "../graphql/queries";
import { RepoDetails, RepoStats } from "./RepositoryItem";
import ReviewItem from "./ReviewItem"

import theme from '../theme/theme';

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


const FullWidthButton = ({ link }) => {

    const handlePress = () => {
        console.log('Button Pressed!');
        Linking.openURL(link);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Open in Github</Text>
            </Pressable>
        </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {

    return (
        <View style={[theme.repositoryItem.container, { backgroundColor: 'white' }]}>
            <RepoDetails
                title={repository.fullName}
                image={repository.ownerAvatarUrl}
                description={repository.description}
                language={repository.language}
                styles={styles}  // Pass styles to RepoDetails
            />
            <RepoStats
                stargazersCount={repository.stargazersCount}
                forksCount={repository.forksCount}
                reviewCount={repository.reviewCount}
                ratingAverage={repository.ratingAverage}
                styles={styles}  // Pass styles to RepoStats
            />
            <FullWidthButton link={repository.url} />
        </View>

    );
}


const SingleRepo = () => {

    let { id } = useParams();

    console.log('id', id);

    const [appState, setAppState] = useState(AppState.currentState);

    const firstValue = 4;

    const { data, loading, error, refetch, fetchMore } = useQuery(SINGLE_REPO, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: id, reviewFirst: firstValue }
    });


    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App has come to the foreground, refetching...');
                refetch();
            }
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove();
        };
    }, [appState]);


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorText}>
                <Text>Error loading repository</Text>
            </View>
        );
    }

    const handleFetchMore = () => {

        console.log('handleFetchMore()')
        const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
        const endCursor = !loading && data?.repository?.reviews?.pageInfo?.endCursor

        console.log('canFetchMore:', canFetchMore);
        console.log('endCursor:', endCursor);

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                reviewAfter: endCursor,
                reviewFirst: firstValue
            },
        })
    }

    const item = data?.repository;
    //console.log('repoDetails', item);

    //console.log('Edges', item.reviews.edges);

    const reviews = item.reviews.edges.map(edge => edge.node);

    console.log('Review count:', reviews.length);

    if (!item) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    //console.log('repo comp', item)

    return (
        <>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item} view='singleRepo' />}
                keyExtractor={({ id }) => id}
                ListHeaderComponent={() => <RepositoryInfo repository={item} />}
                ItemSeparatorComponent={ItemSeparator}
                onEndReached={handleFetchMore}
                onEndReachedThreshold={0.1}
            />
        </>
    )
};



export default SingleRepo;
