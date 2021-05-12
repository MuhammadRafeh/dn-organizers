// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import MainNavigator from './src/navigators/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import { Provider, useSelector } from "react-redux";
import firebase from "firebase";
import AuthNavigator from './src/navigators/AuthNavigator';

//delete from database
// deleteData(){
//   firebase.database().ref('Users/').remove();
// }

//update database
// updateSingleData(email){
//   firebase.database().ref('Users/').update({
//       email,
//   });
// }

//read data from firebase and listen on changes their
// readUserData() {
//   firebase.database().ref('Users/').on('value', function (snapshot) {
//       console.log(snapshot.val())
//   });
// }

//push data -------------------
// writeUserData(email,fname,lname){
//   firebase.database().ref('UsersList/').push({
//       email,
//       fname,
//       lname
//   }).then((data)=>{
//       //success callback
//       console.log('data ' , data)
//   }).catch((error)=>{
//       //error callback
//       console.log('error ' , error)
//   })
// }
// --------------------------------

//update item
// var updates = {};
//     updates["/items/" + this.state.selecteditem.key] = {
//       name: this.state.itemname
//     };

//     return firebaseApp
//       .database()
//       .ref()
//       .update(updates);

//delete item from birebase
// var updates = {};
//     updates["/items/" + key] = null;
//     return firebaseApp
//       .database()
//       .ref()
//       .update(updates);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
// function readUserData() {
//     firebase.database().ref('admin/').once('value', function (snapshot) {
//         console.log(snapshot.val())
//     });
// }

// function readUserData() {
//     firebase.database().ref('admin/').on('value', function (snapshot) {
//         console.log(snapshot.val())
//     });
// }

function AppWrapper() {
  // const firebaseConfig = {
  //   apiKey: 'api-key',
  //   authDomain: 'project-id.firebaseapp.com',
  //   databaseURL: 'https://project-id.firebaseio.com',
  //   projectId: 'project-id',
  //   storageBucket: 'project-id.appspot.com',
  //   messagingSenderId: 'sender-id',
  //   appId: 'app-id',
  //   measurementId: 'G-measurement-id',
  // };

  // firebase.initializeApp(firebaseConfig);
  var config = {
    apiKey: "AIzaSyADijNnt7JWPYBp1cFBxD-V3FXjJYxlX8E",
    storageBucket: "dnorganizers.appspot.com",
    databaseURL: "https://dnorganizers-default-rtdb.firebaseio.com",
    projectId: "dnorganizers",
  };
  // firebase.initializeApp(config);

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app(); // if already initialized, use that one
  }

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
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  return (
    <PaperProvider
      settings={{
        icon: props => <Ionicons {...props} />,
      }}
    >
      <NavigationContainer>
        {!isAuth && <MainNavigator />}
        {isAuth && <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  )
}

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
