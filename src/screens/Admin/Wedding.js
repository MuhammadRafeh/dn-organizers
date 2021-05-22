import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminHeader from '../../components/AdminHeader';

const Wedding = props => {
    return (
        <View style={styles.screen}>
            <AdminHeader  navigation={props.navigation} wedding />
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
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
