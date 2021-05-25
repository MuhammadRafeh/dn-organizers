import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AdminHeader from '../../components/AdminHeader';
import UserClear from '../../models/userClear';
import firebase from 'firebase'
import Card from '../../components/Card';
import { Button } from 'react-native-paper';

const VerifySlips = props => {

    const [slips, setSlips] = useState([]);

    useEffect(() => {
        const ref = firebase.database().ref('userClear/')
        ref.on('value', function (snapshot) {
            // console.log(snapshot.val());
            const transformedData = [];
            for (let id in snapshot.val()) {
                const obj = snapshot.val()[id];
                transformedData.push(
                    new UserClear(id, obj.bankAddress, obj.branchCode, obj.date, obj.pendingInvoiceId, obj.invoiceData, obj.userEmail)
                )
            }
            setSlips([...transformedData]);
        });

        //remove listener
        return () => ref.off('value');
    }, [])

    const verifySlip = (pendingInvoiceId, userClearId, invoiceData) => {
        Promise.all([
            firebase.database().ref(`pendingInvoices/${pendingInvoiceId}`).remove(),
            firebase.database().ref(`userClear/${userClearId}`).remove(),
            firebase.database().ref(`bookedEvents/`).push({...invoiceData, status: 'completed'})
        ]).then((data) => {
            console.log("Operations Successful", data)
        }).catch((e) => console.log(e))
    }

    const rejectSlip = (pendingInvoiceId, userClearId) => {
        firebase.database().ref(`pendingInvoices/${pendingInvoiceId}`).update({
            status: 'submitwrong'
        }).then(() => {
            firebase.database().ref(`userClear/${userClearId}`).remove().then(() => {
                Alert.alert('Successfully Cleared!', 'User cleared their invoice.', [{ style: 'destructive' }])
            }).catch(() => {
                Alert.alert('Something went wrong!', 'Admin please check your network.', [{ style: 'destructive' }])
            });
        }).catch((error) => {
            Alert.alert('Something went wrong!', 'Admin please check your network.', [{ style: 'destructive' }])
        });
    }

    return (
        <View style={styles.screen}>
            {'slips', console.log(slips)}
            <AdminHeader navigation={props.navigation} verifySlips />
            <FlatList
                contentContainerStyle={{ margin: 10, backgroundColor: 'white' }}
                keyExtractor={item => item.id}
                data={slips}
                renderItem={({ item }) => {
                    return (
                        <Card>
                            <View style={styles.slipInfoRow}>
                                <View>
                                    <Text>
                                        {item.branchCode}
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {item.bankAddress}
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        {item.userEmail}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.buttonRow}>
                                <View>
                                    <Button mode="text" onPress={verifySlip.bind(null, item.pendingInvoiceId, item.id, item.invoiceData)}>
                                        Verify
                                    </Button>
                                </View>
                                <View>
                                    <Button mode="text" onPress={rejectSlip.bind(null, item.pendingInvoiceId, item.id)}>
                                        Reject
                                    </Button>
                                </View>
                            </View>
                        </Card>
                    )
                }}
            />
        </View>

    );
}

export default VerifySlips;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    slipInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
