import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Alert, TextInput } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { deletePendingInvoice, updatePendingInvoice } from '../redux/actions';
import Card from './Card';
import { useDispatch } from 'react-redux';
// import firebase from 'firebase/app'
import 'firebase/database';
import firebase from 'firebase';
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import { Dialog, Portal } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';
import getGalleryPermission from '../functions/getGalleryPermission';

const InvoiceItem = props => {
    const { item } = props;
    const [isDeleting, setIsDeleting] = useState(false);
    const [bankAddress, setBankAddress] = useState('');
    const [branchCode, setBranchCode] = useState('');
    // const [imageUri, setImageUri] = useState('');
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);

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

    const onSubmitForm = () => {
        if (branchCode.trim().length <= 1 || bankAddress.trim().length <= 3 ){
            Alert.alert('Fillout Form First!', 'Fill full form in order to submit.', [{text: 'Ok', style: 'destructive'}])
            return;
        }
        
        hideDialog();
        const userClear = {
            invoiceData: item.item,
            date: date.toString(),
            branchCode,
            bankAddress,
            pendingInvoiceId: item.item.id,
            userEmail: item.item.userEmail
        }
        //Now we want to update status of pending invoices;
        firebase.database().ref(`pendingInvoices/${item.item.id}`).update({
            status: 'userclear'
        }).then((response) => {
            console.log('asdasdasd')
            //Now we are creating userClear
            firebase.database().ref('userClear/').push(userClear).then((data) => {
                //success callback
                // dispatch(addPendingInvoice({ ...invoice, id: data.key }))
                dispatch(updatePendingInvoice(item.item.id, { status: 'userclear' }))
                // Alert.alert('Successfully added to Invoices', 'Please go to invoice section to clear first and continue.', [{ text: 'Ok' }])
            }).catch((error) => {
                //error callback
                Alert.alert("Something went wrong.", 'Please check your internet connection!', [{ text: 'OK', style: 'destructive' }])
            })
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <Card style={{ marginHorizontal: 10, marginBottom: 8, marginTop: 8, overflow: 'hidden' }}>
            {/* 1st Row */}
            {console.log(item.item)}
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

                <View style={{flex: 2}}>
                    <Text style={styles.packageNameLabel} numberOfLines={1} adjustsFontSizeToFit={true}>
                        {
                            item.item.isPackage && item.item.serPackName.toUpperCase()
                        }
                    </Text>
                </View>

                <View style={styles.flex1}>
                    {
                        item.item.status == 'userclear' ? (
                            <View style={{ backgroundColor: 'yellow', width: '100%', alignSelf: 'stretch', height: 30, justifyContent: 'center' }}>
                                <Text style={{ color: 'blue', textAlign: 'center' }}>Is Under Review...</Text>
                            </View>

                        ) : (
                            <Button mode="text" onPress={setVisible.bind(null, true)}>
                                Clear
                            </Button>
                        )
                    }
                </View>

            </View>
            {/* --------------------------Message Row */}
            {
                item.item.status == 'submitwrong' ? (
                    <View style={styles.messageRow}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>
                            You submitted wrong info! Please Clear again.
                        </Text>
                    </View>
                ) : (
                    <View />
                )
            }

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
                            item.item.menu.map((itemObj, key) => {
                                return (
                                    <DataTable.Row key={key}>
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
                {/* ----------TODO:-----DONE-------------Uncomment Below & delete <View> under it--------------------------------------------- */}
                {
                    item.item.status != 'userclear' && (
                        <View>
                            {
                                isDeleting ? <ActivityIndicator size={23} color={'red'} /> : (
                                    <Button mode="text" onPress={onDelete}>
                                        Delete
                                    </Button>
                                )
                            }
                        </View>
                    )
                }

                {/* <View>
                    {
                        isDeleting ? <ActivityIndicator size={23} color={'red'} /> : (
                            <Button mode="text" onPress={onDelete}>
                                Delete
                            </Button>
                        )
                    }
                </View> */}

                <View>
                    <Button mode="text" onPress={onPrint}>
                        PRINT
                    </Button>
                </View>

            </View>
            {/* <Image source={{uri: imageUri}} style={{width: '100%', height: 400}} resizeMode={'contain'}/> */}
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.ScrollArea>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                            <View style={{ backgroundColor: '' }}>
                                <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'headings' }}>Fill out form below...</Text>
                            </View>
                            <View style={styles.textInputContainer}>

                                <TextInput
                                    // autoFocus={true}
                                    value={bankAddress}
                                    onChangeText={setBankAddress}
                                    placeholder="Enter Bank Address"
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    // autoFocus={true}
                                    value={branchCode}
                                    onChangeText={setBranchCode}
                                    keyboardType="number-pad"
                                    placeholder="Enter Branch Code"
                                    style={styles.textInput}
                                />
                            </View>

                            {
                                show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )
                            }
                            <View style={styles.textInputContainer}>
                                <Button icon="md-calendar-sharp" mode="contained" onPress={setShow.bind(null, true)}>
                                    Select Submit Date
                                </Button>
                            </View>

                            <View style={{ marginTop: 5, marginBottom: 10 }}>
                                <Button mode="text" onPress={onSubmitForm}>
                                    Submit
                                </Button>
                            </View>

                        </ScrollView>
                    </Dialog.ScrollArea>
                </Dialog>
            </Portal>

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
    },
    textInputContainer: {
        marginBottom: 5,
        marginTop: 5
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'blue'
    },
    messageRow: {
        width: '100%',
        backgroundColor: 'red',
        marginBottom: 10
    }
});
