import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminInvoices = props => {
    return (
        <View style={styles.screen}>
            <Text>This is Admin Invoices Screen</Text>
        </View>
    );
}

export default AdminInvoices;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
