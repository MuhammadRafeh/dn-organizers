import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminRatings = props => {
    return (
        <View style={styles.screen}>
            <Text>This is Admin Ratings Screen.</Text>
        </View>
    );
}

export default AdminRatings;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
