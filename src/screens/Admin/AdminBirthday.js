import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Birthday = props => {
    return (
        <View style={styles.screen}>
            <Text>
               This is admin's Birthday
            </Text>
        </View>
        
    );
}

export default Birthday;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
