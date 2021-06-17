import React from 'react';
import { View, Text } from 'react-native';
import AdminHeader from '../../components/AdminHeader';

const Email = props => {
    return (
        <View>
            <AdminHeader navigation={props.navigation} email />
            <Text>
                Email screen
            </Text>
        </View>
    );
}

export default Email;
