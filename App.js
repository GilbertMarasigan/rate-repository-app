import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
}

export default App;