import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import Header from '../../components/Header';
import firebase from 'firebase';
import PackagesItem from '../../components/PackagesItem';
import { useSelector, useDispatch } from 'react-redux';
import { updateCorporate, addPendingInvoice } from '../../redux/actions';


const Coorporate = props => {
    const dispatch = useDispatch();
    const [packages, email] = useSelector(state => [state.packages.corporate, state.auth.email]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const pullData = () => {
        setIsRefreshing(true);
        firebase.database().ref('events/corporate/packages').once('value', function (snapshot) {
            dispatch(updateCorporate(snapshot.val()));
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
        const invoice = {
            theme,
            menu,
            venu,
            price,
            eventName: 'corporate',
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
        firebase.database().ref('pendingInvoices/').push(invoice).then(function (data) {
            //success callback
            //TODOS------------------------------------------------------------
            // Assign data.key to pendingInvoices as id property //Done
            console.log('firebase assigned key: ', data.key)

            dispatch(addPendingInvoice({...invoice, id: data.key}))
            Alert.alert('Successfully added to Invoices', 'Please go to invoice section to clear first and continue.', [{ text: 'Ok' }])
        }).catch(function (error) {
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

export default Coorporate;

const styles = StyleSheet.create({
    screen: {
        paddingBottom: 80
    }
});
