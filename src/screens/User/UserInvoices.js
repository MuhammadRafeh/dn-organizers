// User Side Screen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import firebase from 'firebase';
import { setPendingInvoices } from '../../redux/actions';
import InvoiceItem from '../../components/InvoiceItem';

const { width, height } = Dimensions.get('window');

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
    // console.log('asdd', events)
    if (events != 'AIzaSyADijNnt7JWPYBp1cFBxD-V3FXjJYxlX8E') {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>
                    Kindly contact Ramaish!
                </Text>
            </View>
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
                ListEmptyComponent={() => {
                    if (!isRefreshing) {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', height: height - 50 }}>
                                <Text style={{ textAlign: 'center', color: 'grey' }}>
                                    No pending invoices yet.
                                </Text>
                            </View>
                        )
                    }
                    return <View />
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
