import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AdminHeader from '../../components/AdminHeader';
import firebase from 'firebase';
import Card from '../../components/Card';
import {Ionicons} from '@expo/vector-icons';

const Email = props => {

    const [emails, setEmails] = useState([]); //[{email, message}, ...]

    useEffect(() => {
        const ref = firebase.database().ref('viewInfo/joinUs')
        ref.on('value', function (snapshot) {
            // console.log(snapshot.val())
            const transformedData = [];
            for (let id in snapshot.val()) {
                const obj = snapshot.val()[id];
                transformedData.push(
                    { email: obj.email, message: obj.message }
                )
            }
            setEmails([...transformedData])
        });

        return () => ref.off('value');
    }, [])

    return (
        <View>
            <AdminHeader navigation={props.navigation} email />
            <FlatList
                keyExtractor={item => item.phone}
                data={emails}
                renderItem={({ item }) => {
                    return (
                        <Card style={{ margin: 10, padding: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <View>
                                    <Text style={{ fontFamily: 'joining'}}>
                                       <Ionicons name={'mail-outline'} size={20} color={'grey'}/> Email
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ textAlign: 'center' }}>
                                        {item.email}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 20, alignItems: 'center' }}>
                                <View style={{ marginBottom: 1 }}>
                                    <Text style={{ fontFamily: 'joining' }}>
                                    <Ionicons name={'md-document-text-outline'} size={20} color={'grey'}/> Message
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ textAlign: 'center' }}>
                                        {item.message}
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    )
                }}
            />
        </View>
    );
}

export default Email;

const styles = StyleSheet.create({
    screen: {
        paddingBottom: 90
    },
    infoRow: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        marginVertical: 1,
        justifyContent: 'space-between'
    },
    labelColor: {
        color: 'grey',
        fontWeight: 'bold'
    }
});
