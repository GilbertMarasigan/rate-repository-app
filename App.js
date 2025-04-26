import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';

import Main from './src/components/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import createApolloClient from './src/components/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () => {

  console.log('Constants.expoConfig', Constants.expoConfig.extra.apolloUri);

  return (
    <SafeAreaProvider>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
}

export default App;