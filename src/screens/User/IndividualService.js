// User Side Screen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const IndividualService = props => {
    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} custom />
            
        </View>
    );
}

export default IndividualService;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
