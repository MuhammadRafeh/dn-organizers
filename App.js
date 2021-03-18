import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './src/screens/Login';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    headings: require('./assets/fonts/main-headings.ttf'),
    Montserrat: require('./assets/fonts/sub-headings.ttf'),
    joining: require('./assets/fonts/stylish.ttf')
  });

  if (!loaded) {
    return <ActivityIndicator color={'blue'} size={50}/>;
  }

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
