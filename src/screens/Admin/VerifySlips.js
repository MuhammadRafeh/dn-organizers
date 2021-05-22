import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Constants from 'expo-constants';
import AdminHeader from '../../components/AdminHeader';
// import { Ionicons } from '@expo/vector-icons';
{/* <View style={{ backgroundColor: 'blue', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ paddingLeft: 20 }}>
        <TouchableOpacity>
            <View style={{ width: 30, alignItems: 'center', borderRadius: 25 }}>
                <Ionicons name={'menu'} size={25} color={'white'} />
            </View>
        </TouchableOpacity>
    </View>
    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'flex-start' }}>
        <Text style={{color: 'white'}}>Wedding</Text>
    </View>
</View> */}

const VerifySlips = props => {
    return (
        <View style={styles.screen}>
            <AdminHeader navigation={props.navigation} verifySlips />
            <Text>
                This is verify slips screen
            </Text>
        </View>
    );
}

export default VerifySlips;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // marginTop: Constants.statusBarHeight
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
