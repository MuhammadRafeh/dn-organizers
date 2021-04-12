import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import UserLogin from './src/screens/Login';
import { Ionicons } from '@expo/vector-icons';
// import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import Login from './src/screens/LoginWith';
import MainNavigator from './src/navigators/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('./assets/images/login-background.jpg'),
      require('./assets/images/bg.jpg')
    ]);

    await Promise.all([...imageAssets]);
    await Font.loadAsync({
      headings: require('./assets/fonts/main-headings.ttf'),
      subHeadings: require('./assets/fonts/sub-headings.ttf'),
      joining: require('./assets/fonts/stylish.ttf'),
      webfont: require('./assets/fonts/Sacramento-Regular.ttf')
    });
  }
  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <PaperProvider
      settings={{
        icon: props => <Ionicons {...props} />,
      }}
    >
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
