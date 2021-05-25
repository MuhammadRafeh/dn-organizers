import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminHeader from '../../components/AdminHeader';
import { Ionicons } from '@expo/vector-icons';
import {Button} from 'react-native-paper';

const Ratings = props => {
    return (
        <View style={styles.screen}>
            <AdminHeader navigation={props.navigation} reviews />
            <View style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: 'grey' }}>
                <View>
                    <Text style={{ textAlign: 'center', marginBottom: 4, fontFamily: 'descent', fontSize: 20 }}>Rafeh@gmail.com</Text>
                    <Text style={{ textAlign: 'center' }}>
                        <Ionicons name={'star'} size={23} color={'red'} />
                        <Ionicons name={'star'} size={23} color={'red'} />
                        <Ionicons name={'star'} size={23} color={'red'} />
                        <Ionicons name={'star-outline'} size={23} color={'red'} />
                        <Ionicons name={'star-outline'} size={23} color={'red'} />
                    </Text>
                    <Text style={{ marginTop: 5, textAlign: 'center' }}>
                        lorem asdad asd as da sd as d asd as da sd as d as da sd asd as da sd as d
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button mode="text" onPress={() => {}}>
                        Accept
                    </Button>
                    <Button mode="text" onPress={() => {}}>
                        Reject
                    </Button>
                </View>
            </View>
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
