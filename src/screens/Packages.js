// User Side Screen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Packages = props => {
    return (
        <View style={styles.screen}>
            <Text>This is Packages Screen</Text>
        </View>
    );
}

export default Packages;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
