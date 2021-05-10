import React from 'react';
import { View, Tect, StyleSheet } from 'react-native';

const Packages = () => {
    return (
        <View style={styles.screen}>
            <Text>
               This is admin's Packages 
            </Text>
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
