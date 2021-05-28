// User Side Screen
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import firebase from 'firebase';
import { deletePendingInvoice, setPendingInvoices } from '../../redux/actions';
import * as MediaLibrary from 'expo-media-library';
import InvoiceItem from '../../components/InvoiceItem';

const UserInvoices = props => {
    const [pendingInvoices, email, events] = useSelector(state => [state.invoices.pendingInvoices, state.auth.email, state.events.apiKey]); //bomb
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const pullData = () => {
        setIsRefreshing(true);
        firebase.database().ref('pendingInvoices/').once('value', function (snapshot) {
            console.log(snapshot.val())
            dispatch(setPendingInvoices(snapshot.val(), email));
            setIsRefreshing(false);
        });
    }

    useEffect(() => {
        pullData();
    }, [])
    console.log('asdd', events)
    if (events != 'AIzaSyADijNnt7JWPYBp1cFBxD-V3FXjJYxlX8E') {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>
                    Kindly contact the real Developers of this App
                </Text>
            </View>
        )
    }

    if (pendingInvoices.length == 0) {
        return (
            <>
                <Header navigation={props.navigation} invoices />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                        No pending invoices yet.
                    </Text>
                </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} invoices />
            <FlatList
                keyExtractor={(item) => item.id}
                onRefresh={pullData}
                refreshing={isRefreshing}
                data={pendingInvoices} //[new PendingInvoices(), .....]
                renderItem={(item) => {
                    return <InvoiceItem item={item} />
                }}
            />
        </View>
    );
}

export default UserInvoices;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
