import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Header from '../../components/Header';
import firebase from "firebase";
import PackagesItem from '../../components/PackagesItem';
import { useSelector, useDispatch } from 'react-redux';
import { updateBirthday, addPendingInvoice } from '../../redux/actions';

const Birthday = props => {
    const dispatch = useDispatch();
    // const [packages, email, pendingInvoices] = useSelector(state => [state.packages.birthday, state.auth.email, state.invoices.pendingInvoices]);
    const [packages, email] = useSelector(state => [state.packages.birthday, state.auth.email]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const pullData = () => {
        setIsRefreshing(true);
        firebase.database().ref('events/birthday/packages').once('value', function (snapshot) {
            dispatch(updateBirthday(snapshot.val()));
            setIsRefreshing(false);
        }, function (err) {
            setIsRefreshing(false);
            console.log('failed to fetch')
        });
    }
    useEffect(() => {
        pullData();
    }, [])

    const handleBookPress = (id, name, theme, menu, venu, price, occuredDate, noOfPeople) => {
        // pendingInvoices.forEach(invoice => {
        //     if (invoice.id == id){

        //     }
        // })
        const invoice = {
            theme,
            menu,
            venu,
            price,
            eventName: 'birthday',
            isPackage: true,
            serPackName: name,
            serPackId: id,
            userEmail: email,
            bookDate: new Date().toString(),
            occuredDate,
            designerName: 'Mast Qalandar',
            status: 'inprogress',
            noOfPeople
        }
        firebase.database().ref('pendingInvoices/').push(invoice).then((data) => {
            //success callback
            dispatch(addPendingInvoice({ ...invoice, id: data.key }))
            Alert.alert('Successfully added to Invoices', 'Please go to invoice section to clear first and continue.', [{ text: 'Ok' }])
        }).catch((error) => {
            //error callback
            Alert.alert("Can't book package.", 'Please check your internet connection!', [{ text: 'OK', style: 'destructive' }])
        })

    }

    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} />
            <FlatList
                onRefresh={pullData}
                refreshing={isRefreshing}
                contentContainerStyle={{ padding: 20 }}
                data={packages}
                renderItem={(item) => {
                    return <PackagesItem
                        // id={item.item.id}
                        name={item.item.name}
                        price={item.item.price}
                        theme={item.item.theme}
                        venu={item.item.venu}
                        menu={item.item.menu}
                        occuredDate={item.item.occuredDate}
                        noOfPeople={item.item.noOfPeople}
                        designerName={item.item.designerName}
                        handleBookPress={() => {
                            handleBookPress(
                                item.item.id,
                                item.item.name,
                                item.item.theme,
                                item.item.menu,
                                item.item.venu,
                                item.item.price,
                                item.item.occuredDate,
                                item.item.noOfPeople
                            )
                        }}
                    />
                }}
            />
        </View>
    );
}

export default Birthday;

const styles = StyleSheet.create({
    screen: {
        paddingBottom: 80
    }
});
