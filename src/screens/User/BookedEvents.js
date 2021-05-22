// User Side Screen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookedEvents = props => {
    return (
        <View style={styles.screen}>
            <Text>
                This is Booked Events Screen.
            </Text>
        </View>
    );
}

export default BookedEvents;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
