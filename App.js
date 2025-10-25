import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';

const queryClient = new QueryClient();

export default function App() {

  useEffect(() => {
    SplashScreen.hide(); // hides splash screen after app loads
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
