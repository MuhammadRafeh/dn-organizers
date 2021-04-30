import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import firebase from 'firebase';

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

const Wedding = props => {
    // readUserData();
    return (
        <View>
            <Header navigation={props.navigation}/>
            <Text>This is Wedding Section</Text>
        </View>
    );
}

export default Wedding;
