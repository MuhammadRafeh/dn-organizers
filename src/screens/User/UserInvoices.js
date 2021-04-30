// User Side Screen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInvoices = props => {
    return (
        <View style={styles.screen}>
            <Text>
                This is user invoices Screen.
            </Text>
        </View>
    );
}

export default UserInvoices;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
