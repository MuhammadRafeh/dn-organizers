import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminHeader from '../../components/AdminHeader';

const Ratings = props => {
    return (
        <View style={styles.screen}>
            <AdminHeader navigation={props.navigation} reviews/>
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
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
