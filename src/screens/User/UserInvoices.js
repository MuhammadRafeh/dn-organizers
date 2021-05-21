// User Side Screen
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import firebase from 'firebase';
import { deletePendingInvoice, setPendingInvoices } from '../../redux/actions';
// import PendingInvoices from '../../models/pendingInvoices';


import InvoiceItem from '../../components/InvoiceItem';

// import ViewShot from "react-native-view-shot";

const UserInvoices = props => {
    const [pendingInvoices, email] = useSelector(state => [state.invoices.pendingInvoices, state.auth.email]);
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [imageUri, setImageUri] = useState('');

    const screenShot = useRef(null);

    const pullData = () => {
        setIsRefreshing(true);
        firebase.database().ref('pendingInvoices').once('value', function (snapshot) {
            console.log(snapshot.val())
            dispatch(setPendingInvoices(snapshot.val(), email));
            setIsRefreshing(false);
        });
        const a = 'asd';
        a.toUpperCase()
    }
    useEffect(() => {
        pullData();
    }, [])
    // console.log(pendingInvoices)
    
    const onClearInvoice = () => {

    }

    // const onDelete = id => {//firebase generated Id
    //     Alert.alert('Are you sure', 'Do you want to delete invoice?', [{ text: 'Yes', onPress: () => {
    //         firebase.database().ref(`pendingInvoices/${id}`).remove().then((data) => {
    //             dispatch(deletePendingInvoice(id));
    //             Alert.alert('Successfully Deleted', 'You have successfully deleted invoice.', [{ text: 'Ok' }])
    //         }).catch((error) => {
    //             Alert.alert('Unable to Delete Invoice', 'Please check your network connection.', [{ text: 'Ok' }])
    //         })
    //     } }, { text: 'No' }])

    // }
    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} invoices />
            <FlatList
                onRefresh={pullData}
                refreshing={isRefreshing}
                data={pendingInvoices} //[new PendingInvoices(), .....]
                renderItem={(item) => {
                    return (
                        <InvoiceItem item={item} onClearInvoice={onClearInvoice}/>
                    )
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
