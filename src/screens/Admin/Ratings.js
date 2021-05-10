import React from 'react';
import { View, Tect, StyleSheet } from 'react-native';

const Ratings = () => {
    return (
        <View style={styles.screen}>
            <Text>
               This is admin's Ratings 
            </Text>
        </View>
    );
}

export default Ratings;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
