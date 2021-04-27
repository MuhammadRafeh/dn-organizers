// User Side Screen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserRatings = props => {
    return (
        <View style={styles.screen}>
            <Text>
                This is User Ratings Screen.
            </Text>
        </View>
    );
}

export default UserRatings;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

