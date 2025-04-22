import { SafeAreaView } from 'react-native-safe-area-context';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';


const Main = () => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#e1e4e8" }}>
                <AppBar />
                <Routes>
                    <Route path='/' element={<RepositoryList />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            </SafeAreaView >
        </>
    );
};

export default Main;