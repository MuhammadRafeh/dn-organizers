import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './src/screens/Login';
import { Ionicons } from '@expo/vector-icons';
// import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

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
      require('./assets/images/login-background.jpg')
    ]);

    await Promise.all([...imageAssets]);
    await Font.loadAsync({
      headings: require('./assets/fonts/main-headings.ttf'),
      subHeadings: require('./assets/fonts/sub-headings.ttf'),
      joining: require('./assets/fonts/stylish.ttf')
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

  // const [loaded] = useFonts({
  // headings: require('./assets/fonts/main-headings.ttf'),
  // Montserrat: require('./assets/fonts/sub-headings.ttf'),
  // joining: require('./assets/fonts/stylish.ttf')
  // });

  // if (!loaded) {
  //   return <ActivityIndicator color={'blue'} size={50}/>;
  // }

  return (
    <PaperProvider
      settings={{
        icon: props => <Ionicons {...props} />,
      }}
    >
      {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}
      <Login />
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
