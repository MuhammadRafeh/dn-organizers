import React from 'react';
import { View, Text } from 'react-native';
import AdminHeader from '../../components/AdminHeader';

const Cv = props => {
    return (
        <View>
            <AdminHeader navigation={props.navigation} cv />
            <Text>
                Cv screen
            </Text>
        </View>
    );
}

export default Cv;
