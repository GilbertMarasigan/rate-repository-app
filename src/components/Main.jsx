import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from './AppBar';

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
    },
    flexItemA: {
        flexGrow: 0,
        backgroundColor: 'green',
    },
    flexItemB: {
        flexGrow: 1,
        backgroundColor: 'blue',
    },
});

const FlexboxExample = () => {
    return (
        <View style={styles.flexContainer}>
            <View style={styles.flexItemA}>
                <Text>Flex item A</Text>
            </View>
            <View style={styles.flexItemB}>
                <Text>Flex item B</Text>
            </View>
        </View>
    );
};

const Main = () => {
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <AppBar />
                <FlexboxExample />
            </SafeAreaView>
        </>
    );
};

export default Main;