import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import theme from './theme';

const AppBar = () => {
    return (
        <SafeAreaView>
            <View style={theme.appBar.container}>
                <Pressable>
                    <Text style={theme.appBar.title}>Repositories</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default AppBar;