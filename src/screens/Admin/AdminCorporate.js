import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminHeader from '../../components/AdminHeader';

const AdminRatings = props => {
    return (
        <View style={styles.screen}>
            <AdminHeader navigation={props.navigation} corporate/>
            <Text>This is Admin Corporate Screen.</Text>
        </View>
    );
}

export default AdminRatings;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
