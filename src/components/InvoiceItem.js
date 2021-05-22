import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { deletePendingInvoice } from '../redux/actions';
import Card from './Card';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';

const InvoiceItem = props => {
    const { item, onClearInvoice, getGalleryPermission } = props;
    const [isDeleting, setIsDeleting] = useState(false);
    // const [imageUri, setImageUri] = useState('');

    const dispatch = useDispatch();

    const screenShot = useRef(null);

    const onDelete = () => {//firebase generated Id
        Alert.alert('Are you sure', 'Do you want to delete invoice?', [{
            text: 'Yes', onPress: () => {
                setIsDeleting(true);
                firebase.database().ref(`pendingInvoices/${item.item.id}`).remove().then((data) => {
                    dispatch(deletePendingInvoice(item.item.id));
                    Alert.alert('Successfully Deleted', 'You have successfully deleted invoice.', [{ text: 'Ok' }])
                }).catch((error) => {
                    Alert.alert('Unable to Delete Invoice', 'Please check your network connection.', [{ text: 'Ok' }])
                    setIsDeleting(false);
                })
            }
        }, { text: 'No' }])

    }

    const onPrint = async () => {
        const isGranted = await getGalleryPermission();
        if (isGranted) {
            screenShot.current.capture().then(async (uri) => {
                console.log("do something with ", uri);
                // setImageUri(uri);
                await MediaLibrary.saveToLibraryAsync(uri);
                Alert.alert('Saved to Gallery', 'Now, make your payment to bank.', [{ text: 'OK' }])
                // console.log('response', response)
            });
        }
    }

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


            <ViewShot style={{ backgroundColor: 'white' }} ref={screenShot} options={{ format: "jpg", quality: 0.9 }}>

                {/* 2nd Row */}
                <View style={styles.priceDetailRow}>

                    <View style={styles.depositDetail}>
                        <View>
                            <Text>Challan No: 75059</Text>
                            <Text>Bank Account: 33303-6931088-1</Text>
                        </View>
                        <View>
                            <Image source={require('../../assets/images/askari.jpg')} style={{ width: 50, height: 50 }} resizeMode="center" />
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

                    <View style={{ marginLeft: '4.5%', marginBottom: 10 }}>
                        <Text style={{ color: 'grey', textAlign: 'center', fontSize: 17 }}>Menu</Text>
                    </View>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title numeric>Price</DataTable.Title>
                        </DataTable.Header>
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
                    </DataTable>

                </View>

            </ViewShot>


            {/* 3rd Row */}
            <View style={styles.lastRow}>

                <View>
                    {
                        isDeleting ? <ActivityIndicator size={23} color={'red'} /> : (
                            <Button mode="text" onPress={onDelete}>
                                Delete
                            </Button>
                        )
                    }
                </View>

                <View>
                    <Button mode="text" onPress={onPrint}>
                        PRINT
                    </Button>
                </View>

            </View>
            {/* <Image source={{uri: imageUri}} style={{width: '100%', height: 400}} resizeMode={'contain'}/> */}

        </Card>
    );
}

export default InvoiceItem;

const styles = StyleSheet.create({
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
