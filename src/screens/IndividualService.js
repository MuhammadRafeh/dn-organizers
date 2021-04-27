// User Side Screen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IndividualService = props => {
    return (
        <View style={styles.screen}>
            <Text>This is Individual Service Screen.</Text>
        </View>
    );
}

export default IndividualService;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
