// User Side Screen
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import firebase from 'firebase';
import { setPendingInvoices } from '../../redux/actions';
import PendingInvoices from '../../models/pendingInvoices';
import Card from '../../components/Card';

import { DataTable } from 'react-native-paper';

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
    // const onCapture = () => {
    //     screenShot.current.capture().then(uri => {
    //         console.log("do something with ", uri);
    //         setImageUri(uri);
    //     });
    // }
    const onClearInvoice = () => {

    }

    const onDelete = () => {

    }

    const onPrint = () => {

    }

    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} invoices />
            <FlatList
                onRefresh={pullData}
                refreshing={isRefreshing}
                data={pendingInvoices} //[new PendingInvoices(), .....]
                renderItem={(item) => {
                    return (
                        <Card style={{ marginHorizontal: 10, marginBottom: 8, marginTop: 8, overflow: 'hidden' }}>
                            {/* 1st Row */}
                            <View style={styles.header}>

                                <View style={styles.flex1}>
                                    {
                                        item.item.isPackage ? (
                                            <Text style={styles.packCustomLabel}>
                                                Package
                                            </Text>) : (
                                            <Text style={styles.packCustomLabel}>
                                                Custom
                                            </Text>
                                        )
                                    }
                                </View>

                                <View style={styles.flex1}>
                                    <Text style={styles.packageNameLabel}>
                                        {
                                            item.item.isPackage && item.item.serPackName.toUpperCase()
                                        }
                                    </Text>
                                </View>

                                <View style={styles.flex1}>
                                    <Button mode="text" onPress={onClearInvoice}>
                                        Clear
                                    </Button>
                                </View>

                            </View>

                            {/* 2nd Row */}
                            <View style={styles.priceDetailRow}>

                                <View style={styles.depositDetail}>
                                    <View>
                                        <Text>Challan No: 75059</Text>
                                        <Text>Bank Account: 33303-6931088-1</Text>
                                    </View>
                                    <View>
                                        <Image source={require('../../../assets/images/askari.jpg')} style={{ width: 50, height: 50 }} resizeMode="center" />
                                    </View>
                                </View>

                                <View style={styles.priceContainer}>
                                    <Text style={styles.totalAmountLabel}>Total Amount</Text>
                                    <Text style={styles.priceLabel}>
                                        {item.item.price} Rs
                                    </Text>
                                </View>

                                <View style={{ marginHorizontal: '4.5%', flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'grey' }}>Theme</Text>
                                    <Text>{item.item.eventName}</Text>
                                </View>

                                <View style={{ marginHorizontal: '4.5%', flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'grey' }}>Venu</Text>
                                    <Text>{item.item.venu}</Text>
                                    {/* here in venu, we want to add venu price */}
                                </View>
                                <View style={{ marginHorizontal: '4.5%', flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'grey' }}>No Of People</Text>
                                    <Text>{item.item.noOfPeople}</Text>
                                </View>
                                {/* <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                                    <TextInput
                                        value={'as'}
                                        disabled
                                    />
                                </View> */}

                                <View style={{ marginLeft: '4.5%', marginBottom: 10 }}>
                                    <Text style={{ color: 'grey', textAlign: 'center', fontSize: 17 }}>Menu</Text>
                                </View>

                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Name</DataTable.Title>
                                        <DataTable.Title numeric>Price</DataTable.Title>
                                    </DataTable.Header>

                                    {/* <DataTable.Row>
                                        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                                        <DataTable.Cell numeric>159</DataTable.Cell>
                                    </DataTable.Row> */}

                                    {
                                        item.item.menu.map(itemObj => {
                                            return (
                                                <DataTable.Row>
                                                    <DataTable.Cell>{itemObj.name}</DataTable.Cell>
                                                    <DataTable.Cell numeric>{parseInt(itemObj.price)}</DataTable.Cell>
                                                </DataTable.Row>
                                            )
                                        })
                                    }

                                    {/* <DataTable.Pagination
                                        page={1}
                                        numberOfPages={3}
                                        onPageChange={page => {
                                            console.log(page);
                                        }}
                                        label="1-2 of 6"
                                    /> */}
                                </DataTable>

                            </View>

                            {/* 3rd Row */}
                            <View style={styles.lastRow}>

                                <View>
                                    <Button mode="text" onPress={onDelete}>
                                        Delete
                                    </Button>
                                </View>

                                <View>
                                    <Button mode="text" onPress={onPrint}>
                                        PRINT
                                    </Button>
                                </View>

                            </View>
                        </Card>
                    )
                }}
            />
            {/* <ViewShot style={{backgroundColor: 'white'}} ref={screenShot} options={{ format: "jpg", quality: 0.9 }}>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
            </ViewShot> */}
            {/* <h1>asd</h1> */}
            {/* <Button title={'preess'} onPress={onCapture} /> */}
            {/* <Image source={{uri: imageUri}} style={{width: '100%', height: 400}} resizeMode={'contain'}/> */}
        </View>
    );
}

export default UserInvoices;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    flex1: {
        flex: 1
    },
    header: {
        backgroundColor: '#add8e6',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5,
        marginBottom: 18
    },
    packCustomLabel: {
        fontSize: 30,
        fontFamily: 'webfont',
        color: 'blue',
        textAlign: 'center'
    },
    packageNameLabel: {
        // fontStyle: 'italic',
        fontFamily: 'headings',
        fontSize: 30,
        color: 'white',
        // textDecorationStyle: 'dotted',
        // textDecorationLine: 'underline',
        textAlign: 'center'
    },
    depositDetail: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    totalAmountLabel: {
        textAlign: 'center',
        color: 'grey'
    },
    priceLabel: {
        fontSize: 40,
        fontFamily: 'descent',
        textAlign: 'center'
    },
    priceDetailRow: {

    },
    priceContainer: {
        marginVertical: 20
    },
    lastRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
    }
});
