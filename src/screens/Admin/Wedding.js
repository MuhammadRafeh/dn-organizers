import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Wedding = () => {
    return (
        <View style={styles.screen}>
            <Text>
               This is admin's Wedding
            </Text>
        </View>
        
    );
}

export default Wedding;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
