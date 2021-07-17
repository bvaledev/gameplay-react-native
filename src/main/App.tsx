import React from 'react';
import {
  LogBox,
  StatusBar
} from 'react-native';
LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine'])
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';

import { Background } from '../components/Background';
import { Routes } from '../routes';
import { AuthProvider } from '../hooks/auth';

export function App(){
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium ,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor='transparent' translucent />
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </Background>
  );
}

registerRootComponent(App);

