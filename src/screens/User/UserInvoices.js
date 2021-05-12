// User Side Screen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import firebase from 'firebase';
import { setPendingInvoices } from '../../redux/actions';

const UserInvoices = props => {
    const [pendingInvoices, email] = useSelector(state => [state.invoices.pendingInvoices, state.auth.email]);
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const pullData = () => {
        setIsRefreshing(true);
        firebase.database().ref('pendingInvoices').once('value', function (snapshot) {
            console.log(snapshot.val())
            dispatch(setPendingInvoices(snapshot.val(), email));
            setIsRefreshing(false);
        });
    }
    useEffect(() => {
        pullData();
    }, [])
    // console.log(pendingInvoices)
    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} invoices />
            <FlatList
                onRefresh={pullData}
                refreshing={isRefreshing}
                data={pendingInvoices}
                renderItem={(item) => {
                    return <View>
                        <Text>
                            {item.item.theme}
                        </Text>
                    </View>
                }}
            />
        </View>
    );
}

export default UserInvoices;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
