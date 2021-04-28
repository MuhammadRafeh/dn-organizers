import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const Birthday = props => {
    return (
        <View>
            <Header navigation={props.navigation}/>
            <Text>This is Birthday Section</Text>
        </View>
    );
}

export default Birthday;