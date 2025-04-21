import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';


const Main = () => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#e1e4e8" }}>
                <AppBar />
                <RepositoryList />
            </SafeAreaView>
        </>
    );
};

export default Main;