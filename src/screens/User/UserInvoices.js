// User Side Screen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const UserInvoices = props => {
    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} invoices/>
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
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
