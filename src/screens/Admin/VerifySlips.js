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
        const updatedInvoice = { ...invoiceData }; // ---|
        delete updatedInvoice["id"]; // ---------------| Doing this to remove id attribute
        Promise.all([
            firebase.database().ref(`pendingInvoices/${pendingInvoiceId}`).remove(),
            firebase.database().ref(`userClear/${userClearId}`).remove(),
            firebase.database().ref(`bookedEvents/`).push({ ...updatedInvoice, status: 'inprogress', ratings: '0' })
        ]).then((data) => {
            // console.log("Operations Successful", data)
            Alert.alert('Verified Successfully!', 'User registered to this event.', [{ text: 'Ok', style: 'destructive' }])
        }).catch((e) => {
            Alert.alert('Something went wrong!', 'Check your network.', [{ text: 'Ok', style: 'destructive' }])
        })
    }

    const rejectSlip = (pendingInvoiceId, userClearId) => {
        Promise.all([
            firebase.database().ref(`pendingInvoices/${pendingInvoiceId}`).update({ status: 'submitwrong' }),
            firebase.database().ref(`userClear/${userClearId}`).remove(),
        ]).then((data) => {
            // console.log("Operations Successful", data)
            Alert.alert('Rejected Successfully!', 'User will fillout again.', [{ text: 'Ok', style: 'destructive' }])
        }).catch((e) => {
            Alert.alert('Something went wrong!', 'Check your network.', [{ text: 'Ok', style: 'destructive' }])
        })
    }

    if (slips.length == 0) {
        return (
            <>
                <AdminHeader navigation={props.navigation} verifySlips />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                        No Slips to verify Anymore.
                    </Text>
                </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            {'slips', console.log(slips)}
            <AdminHeader navigation={props.navigation} verifySlips />
            <FlatList
                keyExtractor={item => item.id}
                data={slips}
                renderItem={({ item }) => {
                    return (
                        <Card style={{ marginVertical: 10, marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10 }}>
                            {/* <View style={styles.slipInfoRow}> */}
                            <View>
                                <Text>
                                    <Text style={{ color: 'grey', fontFamily: 'descent' }}>User Email:</Text> {item.userEmail}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    <Text style={{ color: 'grey', fontFamily: 'descent' }}>Bank Address:</Text> {item.bankAddress}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    <Text style={{ color: 'grey', fontFamily: 'descent' }}>Branch Code:</Text> {item.branchCode}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    <Text style={{ color: 'grey', fontFamily: 'descent' }}>Date:</Text> {new Date(item.date).toUTCString()}
                                </Text>
                            </View>
                            {/* </View> */}
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
        justifyContent: 'space-around',
        marginTop: 10
    }
});
