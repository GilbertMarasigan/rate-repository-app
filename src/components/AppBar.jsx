import { View, StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        // ...
    },
    topBarContainer: {
        backgroundColor: '#24292e',
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    topBarTitle: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    // ...
});

const AppBar = () => {
    return (
        <SafeAreaView>
            <View style={styles.topBarContainer}>
                <Pressable>
                    <Text style={styles.topBarTitle}>Repositories</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default AppBar;