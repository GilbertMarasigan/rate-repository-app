import { View, Text, ActivityIndicator, StyleSheet, Pressable, Linking, AppState } from 'react-native';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { SINGLE_REPO } from "../graphql/queries";
import { RepoDetails, RepoStats } from "./RepositoryItem";
import theme from '../theme/theme';

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
    }
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

const SingleRepo = () => {

    let { id } = useParams();

    console.log('id', id);

    const [appState, setAppState] = useState(AppState.currentState);

    const { data, loading, error, refetch } = useQuery(SINGLE_REPO, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: id }
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

    const item = data?.repository;
    console.log('repoDetails', item);

    if (!item) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }


    return (
        <View style={[theme.repositoryItem.container, { backgroundColor: 'white' }]}>
            <RepoDetails
                title={item.fullName}
                image={item.ownerAvatarUrl}
                description={item.description}
                language={item.language}
                styles={styles}  // Pass styles to RepoDetails
            />
            <RepoStats
                stargazersCount={item.stargazersCount}
                forksCount={item.forksCount}
                reviewCount={item.reviewCount}
                ratingAverage={item.ratingAverage}
                styles={styles}  // Pass styles to RepoStats
            />
            <FullWidthButton link={item.url} />
        </View>

    );
};

export default SingleRepo;
