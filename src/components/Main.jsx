import { SafeAreaView } from 'react-native-safe-area-context';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepo from './SingleRepo';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';

const Main = () => {

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#e1e4e8" }}>
                <AppBar />
                <Routes>
                    <Route path='/' element={<RepositoryList />} />
                    {/* <Route path='/' element={<CreateReview />} /> */}
                    <Route path='/createReview' element={<CreateReview />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/myReviews' element={<MyReviews />} />
                    <Route path=':id' element={<SingleRepo />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            </SafeAreaView >
        </>
    );
};

export default Main;