import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import AdminHeader from '../../components/AdminHeader';
import { Dialog, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import uploadToFirebase from '../../functions/uploadToFirebase';
import { deletePackage, deleteItems, setBirthdayItems, updateBirthday } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase'
import DataTable from '../../components/DataTable';
import AdminPackageItems from '../../components/AdminPackageItems';
import { designers } from '../../data/Data';

const AdminWedding = props => {
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => {
        setSelectedMenu([]);
        setVenuName('Select Venu')
        setVisible(false);
    }
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const dispatch = useDispatch();
    // Package Model State's
    const [packageName, setPackageName] = useState('');
    const [price, setPrice] = useState('');
    const [menuTotalPrice, setMenuTotalPrice] = useState('');
    const [venuName, setVenuName] = useState('Select Venu');
    const [venuPrice, setVenuPrice] = useState('');
    const [noOfPeople, setNoOfPeople] = useState('');
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [designer, setDesigner] = useState('');
    //take occured Date from date state

    //Item Model State
    const [addMenuName, setAddMenuName] = useState('');
    const [addMenuPrice, setAddMenuPrice] = useState('');
    const [addVenuName, setAddVenuName] = useState('');
    const [addVenuPrice, setAddVenuPrice] = useState('');
    //-------------------------- 

    //Delete Venu and Menu state
    const [deleteVenuName, setDeleteVenuName] = useState('');
    const [deleteMenuName, setDeleteMenuName] = useState('');
    const [deleteVenuId, setDeleteVenuId] = useState('');
    const [deleteMenuId, setDeleteMenuId] = useState('');
    //---------------------------------------------------
    const [items, packages] = useSelector(state => [state.items.birthdayItems, state.packages.birthday]);
    let venu = [];
    let menu = [];
    try {
        venu = items.filter(obj => obj['venu'])[0]['venu'];
        menu = items.filter(obj => obj['menu'])[0]['menu'];
    } catch (error) {

    }
    const addMenu = () => {
        if (addMenuName.length >= 1 && +addMenuPrice >= 1) {
            uploadToFirebase(
                'events/birthday/items/menu',
                { name: addMenuName, price: +addMenuPrice },
                'Successfully Added.',
                'You now have new Birthday menu item!',
                "Something went wrong.",
                'Please check your network!',
                dispatch,
                'birAddMenu'
            )
            setAddMenuPrice('');
            setAddMenuName('');
            return;
        }
        Alert.alert('Fillout Name/Price first', 'Fill in order to continue', [{ text: 'OK', style: 'destructive' }])
    }

    const addVenu = () => {
        if (addVenuName.length >= 1 && +addVenuPrice >= 1) {
            uploadToFirebase(
                'events/birthday/items/venu',
                { name: addVenuName, price: +addVenuPrice },
                'Successfully Added.',
                'You now have new Birthday menu item!',
                "Something went wrong.",
                'Please check your network!',
                dispatch,
                'birAddVenu'
            )
            setAddVenuName('');
            setAddVenuPrice('');
            return;
        }
        Alert.alert('Fillout Name/Price first', 'Fill in order to continue', [{ text: 'OK', style: 'destructive' }])
    }

    const deletePackages = id => {
        firebase.database().ref(`events/birthday/packages/${id}`).remove().then(() => {
            dispatch(deletePackage(id, 'birthday'));
            Alert.alert('Successfully deleted', 'No one have access to this package now.', [{ text: 'OK', style: "destructive" }])
        }).catch((error) => {
            Alert.alert('Something went wrong!', 'Please check your network', [{ text: 'Ok', style: 'destructive' }])
        })
    }

    const getPackages = () => {
        firebase.database().ref('events/birthday/').once('value', function (snapshot) {
            const { items, packages } = snapshot.val();
            dispatch(setBirthdayItems(items));
            dispatch(updateBirthday(packages));
        }, function (err) {
            console.log('failed to fetch')
        });
    }

    useEffect(() => {
        getPackages();
    }, [])

    const handleSelectionMenu = list => { //[{checked, id, name, price},{},...]
        let menuAmount = 0;
        list.forEach(item => {
            menuAmount = menuAmount + parseInt(item.price);
        })
        setSelectedMenu(list);
        setMenuTotalPrice(menuAmount);
    }

    const onSubmitForm = () => {
        const menu = selectedMenu.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: parseInt(item.price)
            }
        });
        if (menu.length == 0) {
            Alert.alert('Select menu first!', 'Please select at least 1 menu item', [{ text: 'Ok', style: "destructive" }])
            return;
        } else if (venuName == 'Select Venu' || +noOfPeople <= 0 || packageName.length < 1 || +price <= 0 || designer == 'Select Designer') {
            Alert.alert('Please fillout form first!', 'First fillout form to continue.', [{ text: 'Ok', style: "destructive" }])
            return;
        }

        if (date.getTime() < new Date().getTime()) {
            Alert.alert('Date must be Greater!', 'Event date must be greater than current date.', [{ text: 'Ok', style: 'destructive' }])
            return;
        }

        const pushData = {
            name: packageName,
            price,
            theme: 'birthday',
            venu: venuName,
            menu,
            occuredDate: date.toString(),
            noOfPeople,
            designerName: designer
        }
        uploadToFirebase(
            'events/birthday/packages/',
            pushData,
            'Package Added successfully!',
            'Everyone can see this package and approach.',
            'Something Went Wrong!',
            'Please check your network.',
            dispatch,
            'birAddPackage'
        )
        hideDialog();
    }

    const deleteItem = type => { // 'venu' | 'menu'
        // deleteMenuId, deleteVenuId
        if (type == 'venu') {
            if (deleteVenuId == '0') {
                Alert.alert('Please Select Venu First!', 'Select item to delete.', [{ text: 'Ok', style: 'destructive' }])
                return;
            }
            firebase.database().ref(`events/birthday/items/venu/${deleteVenuId}`).remove().then(() => {
                dispatch(deleteItems('birthdayItems', deleteVenuId, 'venu'));
                Alert.alert('Successfully Deleted!', 'This item is no more exists.', [{ text: 'Ok', style: 'destructive' }])
            }).catch(() => {
                Alert.alert('Something went wrong!', 'Please check your network.', [{ text: 'Ok', style: 'destructive' }])
            })
        } else if (type == 'menu') {
            if (deleteMenuId == '0') {
                Alert.alert('Please Select Menu First!', 'Select item to delete.', [{ text: 'Ok', style: 'destructive' }])
                return
            }
            firebase.database().ref(`events/birthday/items/menu/${deleteMenuId}`).remove().then(() => {
                dispatch(deleteItems('birthdayItems', deleteMenuId, 'menu'));
                Alert.alert('Successfully Deleted!', 'This item is no more exists.', [{ text: 'Ok', style: 'destructive' }])
            }).catch(() => {
                Alert.alert('Something went wrong!', 'Please check your network.', [{ text: 'Ok', style: 'destructive' }])
            })
        }
    }

    return (
        <ScrollView>
            <AdminHeader navigation={props.navigation} birthday />
            {
                items.length != 0 ? (

                    <>
                        <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                            <Button icon="add-circle" mode="contained" onPress={setVisible.bind(null, true)}>
                                ADD  PACKAGE
                            </Button>
                        </View>
                        {/* ------------------------ADD PACKAGE Model--------------------------------------- */}
                        <Portal>
                            <Dialog visible={visible} onDismiss={hideDialog}>
                                <Dialog.ScrollArea>
                                    <ScrollView contentContainerStyle={{ paddingHorizontal: 1 }}>
                                        <View style={{ backgroundColor: '' }}>
                                            <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'headings' }}>
                                                Add Package Details
                                            </Text>
                                        </View>
                                        <View style={styles.textInputContainer}>
                                            <TextInput
                                                // autoFocus={true}
                                                value={packageName}
                                                onChangeText={setPackageName}
                                                placeholder="Package Name"
                                                style={styles.textInput}
                                            />
                                        </View>
                                        <View style={styles.textInputContainer}>
                                            <TextInput
                                                // autoFocus={true}
                                                value={price}
                                                onChangeText={(value) => {
                                                    if (+value) setPrice(value);
                                                    else if (value == '') setPrice('');
                                                }}
                                                keyboardType="number-pad"
                                                placeholder="Price"
                                                style={styles.textInput}
                                            />
                                        </View>
                                        <View style={styles.textInputContainer}>
                                            <TextInput
                                                // autoFocus={true}
                                                value={'Wedding'}
                                                onChangeText={() => { }}
                                                keyboardType="number-pad"
                                                placeholder="Theme"
                                                style={{ ...styles.textInput }}
                                                editable={false}
                                            />
                                        </View>
                                        <View style={styles.textInputContainer}>
                                            <TextInput
                                                // autoFocus={true}
                                                value={noOfPeople}
                                                onChangeText={(value) => {
                                                    if (+value) setNoOfPeople(value);
                                                    // else if (value == '') setNoOfPeople(1);
                                                    else if (value == '') {
                                                        setNoOfPeople('');
                                                    }
                                                }}
                                                keyboardType="number-pad"
                                                placeholder="No Of People"
                                                style={styles.textInput}
                                            />
                                        </View>
                                        {/* Menu Row */}
                                        <View style={{ marginVertical: 5 }}>
                                            <Text style={{ color: 'grey', fontFamily: 'descent', textAlign: 'center', fontSize: 20 }}>
                                                Menu
                                            </Text>
                                        </View>
                                        <View style={styles.menuRow}>
                                            <DataTable
                                                list={menu}
                                                handleSelectionMenu={handleSelectionMenu}
                                            />
                                        </View>
                                        {/* Venu Row */}
                                        <View style={{ width: '40%', alignSelf: 'center' }}>
                                            <Text
                                                style={{ color: 'grey', fontFamily: 'descent', textAlign: 'center', fontSize: 20 }}
                                                numberOfLines={1}
                                                adjustsFontSizeToFit={true}
                                            >
                                                Venu
                                            </Text>
                                        </View>
                                        <View style={{ width: '50%', alignSelf: 'center', height: 1, backgroundColor: 'grey' }} />
                                        <View style={styles.menuRow}>
                                            <View>
                                                <Text style={{ color: 'grey' }}>
                                                    Name:
                                                </Text>
                                            </View>
                                            {/* VENU NAME----------------------------------- */}

                                            <View style={{ marginLeft: 5, marginTop: 5, marginBottom: 25 }}>
                                                <Picker
                                                    style={{ width: '100%', height: 20 }}
                                                    selectedValue={venuName}
                                                    mode="dropdown"
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        setVenuName(itemValue.name);
                                                        // setVenuPrice(itemValue.price);
                                                        //here we want to calculate price
                                                    }
                                                    }>
                                                    <Picker.Item key={0} label={'Select Venu'} value={{ name: 'Select Venu' }} />
                                                    {venu.map((item) => (
                                                        <Picker.Item key={item.id} label={`${item.name}`} value={{ name: item.name }} />
                                                    ))
                                                    }
                                                </Picker>
                                            </View>

                                            <View style={{ width: '40%', alignSelf: 'center' }}>
                                                <Text 
                                                    style={{ color: 'grey', fontFamily: 'descent', textAlign: 'center', fontSize: 20 }}
                                                    numberOfLines={1}
                                                    adjustsFontSizeToFit={true}
                                                >
                                                    Designer
                                                </Text>
                                            </View>
                                            <View style={{ width: '50%', alignSelf: 'center', height: 1, backgroundColor: 'grey' }} />

                                            <View>
                                                <Text style={{ color: 'grey' }}>
                                                    Name:
                                                </Text>
                                            </View>
                                            {/* VENU PRICE------------------------------- */}
                                            <View style={{ marginLeft: 5, marginTop: 5, marginBottom: 25 }}>
                                                <Picker
                                                    style={{ width: '100%', height: 20 }}
                                                    selectedValue={designer}
                                                    mode="dropdown"
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        setDesigner(itemValue?.name);
                                                        // setVenuPrice(itemValue.price);
                                                        //here we want to calculate price
                                                    }
                                                    }>
                                                    <Picker.Item key={0} label={'Select Designer'} value={{ name: 'Select Designer' }} />
                                                    {designers.map((item, index) => (
                                                        <Picker.Item key={index} label={`${item.name}`} value={{ name: item.name }} />
                                                    ))
                                                    }
                                                </Picker>
                                            </View>
                                        </View>
                                        {/* Occured Date */}
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
                                                Select Occured Date
                                            </Button>
                                        </View>

                                        <View style={{ marginTop: 5, marginVertical: 10 }}>
                                            <Button mode="text" onPress={onSubmitForm}>
                                                Add Package
                                            </Button>
                                        </View>
                                    </ScrollView>
                                </Dialog.ScrollArea>
                            </Dialog>
                        </Portal>
                    </>
                ) : (
                    <View style={{ marginTop: 10 }}>
                        <ActivityIndicator size={25} color={'red'} />
                    </View>
                )
            }
            {/* --------------------------------END ADD PACKAGE MODAL----------------------------------------------- */}

            {/* <Button icon="add-circle" mode="contained" onPress={() => { }}>
                ADD ITEMS
                </Button> */}
            <View>
                <Text style={{ textAlign: 'center', marginBottom: 5, marginTop: 15, fontFamily: 'webfont', fontSize: 40 }}>Manage Items</Text>
            </View>

            <View style={{ marginBottom: 5, marginTop: 15 }}>
                <Text style={{ color: 'grey', fontFamily: 'descent', marginLeft: 10, fontSize: 15 }}>
                    Menu
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <TextInput
                        // autoFocus={true}
                        value={addMenuName}
                        onChangeText={setAddMenuName}
                        placeholder="Name"
                        style={styles.textInput}
                    />
                </View>
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <TextInput
                        // autoFocus={true}
                        value={addMenuPrice}
                        onChangeText={(value) => {
                            if (+value) setAddMenuPrice(value);
                            else if (value == '') setAddMenuPrice('');

                        }}
                        keyboardType="number-pad"
                        placeholder="Price"
                        style={{ ...styles.textInput, borderBottomColor: 'red' }}
                    />
                </View>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 10 }}>
                <View />
                <Button icon="add-circle" mode="contained" onPress={addMenu}>
                    ADD Menu
                </Button>
            </View>
            {/* DELETE MENU PICKER------------------------------------------ */}
            <View style={{ marginLeft: 5, marginTop: 10 }}>
                <Picker
                    style={{ width: '100%', height: 20 }}
                    selectedValue={deleteMenuName}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) => {
                        setDeleteMenuName(itemValue.name);
                        setDeleteMenuId(itemValue.id);
                    }
                    }>
                    <Picker.Item key={-1} label={'Select Menu'} value={{ name: 'Select Menu', id: '0' }} />
                    {menu.map((item) => (
                        <Picker.Item key={item.id} label={`${item.name}`} value={{ name: item.name, id: item.id }} />
                    ))
                    }
                </Picker>
            </View>
            {/* DELETE MENU-------------------------------------------------- */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 10, marginBottom: 5 }}>
                <View />
                <View>
                    <Button icon="trash-outline" mode="outlined" onPress={deleteItem.bind(null, 'menu')}>
                        DELETE MENU
                    </Button>
                </View>
            </View>
            <View style={{ marginBottom: 5, marginTop: 15 }}>
                <Text style={{ color: 'grey', fontFamily: 'descent', marginLeft: 10, fontSize: 15 }}>
                    Venu
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <TextInput
                        // autoFocus={true}
                        value={addVenuName}
                        onChangeText={setAddVenuName}
                        placeholder="Name"
                        style={styles.textInput}
                    />
                </View>
                <View style={{ flex: 1, marginHorizontal: 10 }}>

                    <TextInput
                        // autoFocus={true}
                        value={addVenuPrice}
                        onChangeText={(value) => {
                            if (+value) setAddVenuPrice(value);
                            else if (value == '') setAddVenuPrice('');

                        }}
                        keyboardType="number-pad"
                        placeholder="Price"
                        style={{ ...styles.textInput, borderBottomColor: 'red' }}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 10 }}>
                <View />
                <Button icon="add-circle" mode="contained" onPress={addVenu}>
                    ADD Venu
                </Button>
            </View>
            {/* DELETE VENU PICKER---------------------------------------------------- */}
            <View style={{ marginLeft: 5, marginTop: 10 }}>
                <Picker
                    style={{ width: '100%', height: 20 }}
                    selectedValue={deleteVenuName}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) => {
                        setDeleteVenuName(itemValue.name);
                        setDeleteVenuId(itemValue.id)
                        // setVenuPrice(itemValue.price);
                        //here we want to calculate price
                    }
                    }>
                    <Picker.Item key={-1} label={'Select Venu'} value={{ name: 'Select Venu', id: 0 }} />
                    {venu.map((item) => (
                        <Picker.Item key={item.id} label={`${item.name}`} value={{ name: item.name, id: item.id }} />
                    ))
                    }
                </Picker>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 10, marginBottom: 20 }}>
                <View />
                <View>
                    <Button icon="trash-outline" mode="outlined" onPress={deleteItem.bind(null, 'venu')}>
                        DELETE VENU
                    </Button>
                </View>
            </View>

            <View>
                <Text style={{ textAlign: 'center', marginBottom: 5, marginTop: 5, fontFamily: 'webfont', fontSize: 40 }}>Manage Packages</Text>
            </View>
            {packages.map((item, map) => {
                // console.log( '------------------',item.id)
                return (
                    <AdminPackageItems
                        key={item.id}
                        handleBookPress={deletePackages.bind(null, item.id)}
                        menu={item.menu}
                        name={item.name}
                        price={item.price}
                        theme={item.theme}
                        venu={item.venu}
                        noOfPeople={item.noOfPeople}
                        occuredDate={new Date(item.occuredDate).toUTCString()}
                        designerName={item.designerName}
                    />
                )
            })}
        </ScrollView>

    );
}

export default AdminWedding;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    textInputContainer: {
        marginBottom: 5,
        marginTop: 10
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'blue'
    },
    menuRow: {
        width: '100%'
    }
});
