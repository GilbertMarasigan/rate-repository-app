import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';
import { USER_LOGGED_IN } from '../graphql/queries';

const styles = StyleSheet.create({
    appBar: {
        container: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#24292e',
            paddingTop: 16,
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        title: {
            color: '#ffffff',
            fontSize: 24,
            fontWeight: '700',
        },
        tab: {
            flexGrow: 1
        },
    },

});

const AppBar = () => {

    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();
    const navigate = useNavigate();

    const { data, loading } = useQuery(USER_LOGGED_IN, {
        fetchPolicy: 'cache-and-network',
        variables: {
            "includeReviews": false
        }
    });

    if (loading) return null;

    const isLoggedIn = data?.me !== null;

    console.log('isLoggedIn', isLoggedIn)
    console.log('data', data)

    const signOut = async () => {
        console.log('sign out')
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
        navigate('/signin');
    }

    return (
        <SafeAreaView>
            <View style={styles.appBar.container}>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                    showsHorizontalScrollIndicator={false}
                    style={{ flexGrow: 1 }}
                >
                    <View style={styles.appBar.tab}>
                        <Link to="/" underlayColor="transparent">
                            <Text style={styles.appBar.title}>Repositories</Text>
                        </Link>
                    </View>
                    {isLoggedIn ? (<>
                        <View style={[styles.appBar.tab, { marginLeft: 30 }]}>
                            <Text onPress={() => navigate('/createReview')} style={styles.appBar.title}>
                                Create a Review
                            </Text>
                        </View>
                        <View style={[styles.appBar.tab, { marginLeft: 30 }]}>
                            <Text onPress={() => navigate('/myReviews')} style={styles.appBar.title}>
                                My reviews
                            </Text>
                        </View>
                        <View style={[styles.appBar.tab, { marginLeft: 30 }]}>
                            <Text onPress={signOut} style={styles.appBar.title}>
                                Sign Out
                            </Text>
                        </View>
                    </>
                    ) : (
                        <>
                            <View style={[styles.appBar.tab, { marginLeft: 30 }]}>
                                <Link to="/signin" underlayColor="transparent">
                                    <Text style={styles.appBar.title}>Sign In</Text>
                                </Link>
                            </View>
                            <View style={[styles.appBar.tab, { marginLeft: 30 }]}>
                                <Link to="/signup" underlayColor="transparent">
                                    <Text style={styles.appBar.title}>Sign Up</Text>
                                </Link>
                            </View>
                        </>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AppBar;