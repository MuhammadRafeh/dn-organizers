import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const Wedding = props => {
    return (
        <View>
            <Header navigation={props.navigation}/>
            <Text>This is Wedding Section</Text>
        </View>
    );
}

export default Wedding;
