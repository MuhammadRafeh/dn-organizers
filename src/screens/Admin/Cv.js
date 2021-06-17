import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AdminHeader from '../../components/AdminHeader';
import CvForm from '../../models/cvForm';
import firebase from 'firebase';
import Card from '../../components/Card';

const Cv = props => {

    const [cv, setCv] = useState([]);

    useEffect(() => {
        const ref = firebase.database().ref('viewInfo/cv')
        ref.on('value', function (snapshot) {
            // console.log(snapshot.val())
            const transformedData = [];
            for (let id in snapshot.val()) {
                const obj = snapshot.val()[id];
                transformedData.push(
                    new CvForm(obj.firstName, obj.lastName, obj.phone, obj.workAs, obj.event, obj.CNIC, obj.email, obj.message)
                )
            }
            setCv([...transformedData])
        });

        return () => ref.off('value');
    }, [])
    return (
        <View style={styles.screen}>
            <AdminHeader navigation={props.navigation} cv />
            <FlatList
                keyExtractor={item => item.phone}
                data={cv}
                renderItem={({ item }) => {
                    return (
                        <Card style={{ margin: 10, padding: 10 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: '86%', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'joining', fontSize: 18 }} numberOfLines={1}>{item.firstName} {item.lastName}</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: 'grey', width: '90%', alignSelf: 'center', marginBottom: 10 }} />
                            <View style={styles.infoRow}>
                                <View>
                                    <Text style={styles.labelColor}>
                                        Phone Num:
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {item.phone}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <View>
                                    <Text style={styles.labelColor}>
                                        Work As:
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {item.workAs}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <View>
                                    <Text style={styles.labelColor}>
                                        Event:
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {item.event}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <View>
                                    <Text style={styles.labelColor}>
                                        CNIC:
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {item.CNIC}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.infoRow}>
                                <View>
                                    <Text style={styles.labelColor}>
                                        Email:
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {item.email}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                <View style={{ marginBottom: 5 }}>
                                    <Text style={{ fontFamily: 'joining' }}>
                                        Message
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

export default Cv;

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
