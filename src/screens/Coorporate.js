import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const Coorporate = props => {
    return (
        <View>
            <Header navigation={props.navigation}/>
            <Text>This is Coorporate Section</Text>
        </View>
    );
}

export default Coorporate;