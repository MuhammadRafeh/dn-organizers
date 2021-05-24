import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import AdminHeader from '../../components/AdminHeader';
import { Dialog, Portal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import uploadToFirebase from '../../functions/uploadToFirebase';
import { setBirthdayItems } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase'
import DataTable from '../../components/DataTable';

const AdminBirthday = props => {
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => {
        setSelectedMenu([]);
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
    const [venuName, setVenuName] = useState('');
    const [venuPrice, setVenuPrice] = useState('');
    const [noOfPeople, setNoOfPeople] = useState('');
    const [selectedMenu, setSelectedMenu] = useState([]);
    //take occured Date from date state

    //Item Model State
    const [addMenuName, setAddMenuName] = useState('');
    const [addMenuPrice, setAddMenuPrice] = useState('');
    const [addVenuName, setAddVenuName] = useState('');
    const [addVenuPrice, setAddVenuPrice] = useState('');
    //-------------------------- 
    const birthdayItems = useSelector(state => state.items.birthdayItems);
    const addMenu = () => {
        if (addMenuName.length >= 1 && +addMenuPrice >= 1) {
            uploadToFirebase(
                'events/birthday/items/menu',
                { name: addMenuName, price: +addMenuPrice },
                'Successfully Added.',
                'You now have new Birthday menu item!',
                "Something went wrong.",
                'Please check your network!'
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
                'Please check your network!'
            )
            setAddVenuName('');
            setAddVenuPrice('');
            return;
        }
        Alert.alert('Fillout Name/Price first', 'Fill in order to continue', [{ text: 'OK', style: 'destructive' }])
    }

    

    // const menuItems = birthdayItems.filter(obj => obj['menu'])[0]['menu'];
    // const venuItems = birthdayItems.filter(obj => obj['venu'])[0]['venu'];

    useEffect(() => {
        firebase.database().ref('events/birthday/items').once('value', function (snapshot) {
            // dispatch(updateWedding(snapshot.val()));
            dispatch(setBirthdayItems(snapshot.val()));
            // setIsRefreshing(false);
            // Alert.alert('Successfully fet', 'ads', [{ text: 'ok' }])
        }, function (err) {
            // setIsRefreshing(false);
            console.log('failed to fetch')
        });
    }, [])

    const handleSelectionMenu = list => { //[{checked, id, name, price},{},...]
        //here we want to calcultae price
        let menuAmount = 0;
        list.forEach(item => {
            menuAmount = menuAmount + parseInt(item.price);
        })
        setSelectedMenu(list);
        setMenuTotalPrice(menuAmount);
    }

    const onSubmitForm = () => { //type can be package/item
        const menu = selectedMenu.map(item => {
            // delete item["checked"];
            // price = price + (item.price * peopleCount);
            return {
                id: item.id,
                name: item.name,
                price: parseInt(item.price)
            }
        });

        const pushData = {
            name: packageName,
            price,
            theme: 'wedding',
            venu: venuName,
            menu,
            occuredDate: date.toString(),
            noOfPeople
        }
        uploadToFirebase(
            'events/birthday/packages/',
            pushData,
            'Package Added successfully!',
            'Everyone can see this package and approach.',
            'Something Went Wrong!',
            'Please check your network.'
        )
        hideDialog();
    }

    return (
        // <Ionicons name="add-outline"/>
        <View style={styles.screen}>
            {console.log('wedding ITems', selectedMenu)}
            <AdminHeader navigation={props.navigation} birthday />
            {
                birthdayItems.length != 0 ? (

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
                                                        setNoOfPeople('1');
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
                                                list={birthdayItems.filter(obj => obj['menu'])[0]['menu']}
                                                handleSelectionMenu={handleSelectionMenu}
                                            />
                                        </View>
                                        {/* Venu Row */}
                                        <View style={{ marginBottom: 5, marginTop: 15 }}>
                                            <Text style={{ color: 'grey', fontFamily: 'descent', textAlign: 'center', fontSize: 20 }}>
                                                Venu
                                            </Text>
                                        </View>
                                        <View style={styles.menuRow}>
                                            <View>
                                                <Text style={{ color: 'grey' }}>
                                                    Name:
                                                </Text>
                                            </View>
                                            {/* VENU NAME----------------------------------- */}

                                            <View style={{ marginLeft: 5, marginVertical: 5 }}>
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
                                                    {birthdayItems.filter(obj => obj['venu'])[0]['venu'].map((item) => (
                                                        <Picker.Item key={item.id} label={`${item.name}`} value={{ name: item.name }} />
                                                    ))
                                                    }
                                                </Picker>
                                            </View>
                                            <View>
                                                <Text style={{ color: 'grey' }}>
                                                    Price:
                                                </Text>
                                            </View>
                                            {/* VENU PRICE------------------------------- */}
                                            <View style={{ marginLeft: 5, marginVertical: 5 }}>
                                                <Picker
                                                    style={{ width: '100%', height: 20 }}
                                                    selectedValue={venuPrice}
                                                    mode="dropdown"
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        setVenuPrice(itemValue?.price);
                                                        // setVenuPrice(itemValue.price);
                                                        //here we want to calculate price
                                                    }
                                                    }>
                                                    {birthdayItems.filter(obj => obj['menu'])[0]['menu'].map((item) => (
                                                        <Picker.Item key={item?.id} label={`${item?.price}`} value={{ price: item?.price }} />
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

                                        <View style={{ marginTop: 5 }}>
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
                <Text style={{ textAlign: 'center', marginBottom: 5, marginTop: 15, fontFamily: 'webfont', fontSize: 30 }}>Add Items</Text>
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
        </View>

    );
}

export default AdminBirthday;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
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
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        // alignItems: 'center'
        width: '100%'
    }
});

