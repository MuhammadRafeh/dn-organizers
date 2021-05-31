// User Side Screen
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Header from '../../components/Header';
import { ToggleButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import DataTable from '../../components/DataTable';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, addPendingInvoice } from '../../redux/actions';
import { designers } from '../../data/Data';

const IndividualService = props => {
    const [value, setValue] = useState('');
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [peopleCount, setPeopleCount] = useState('1');
    const [selectedDesigner, setSelectedDesigner] = useState('');

    const [price, setPrice] = useState(0);

    const [selectedVenu, setSelectedVenu] = useState('');
    const [venuPrice, setVenuPrice] = useState('');
    const [menuPrice, setMenuPrice] = useState('');

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const { weddingItems, birthdayItems, corporateItems, email } = useSelector(state => ({ ...state.items, email: state.auth.email }));

    const handleSelectionMenu = list => { //[{checked, id, name, price},{},...]
        //here we want to calcultae price
        let menuAmount = 0;
        list.forEach(item => {
            menuAmount = menuAmount + item.price;
        })
        setSelectedMenu(list);
        setMenuPrice(menuAmount);
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onSubmitData = () => {
        // let price = 0;
        const menu = selectedMenu.map(item => {
            // delete item["checked"];
            // price = price + (item.price * peopleCount);
            return {
                id: item.id,
                name: item.name,
                price: parseInt(item.price)
            }
        })
        // console.log('--------------->', price)
        if (menu.length == 0 || value == '' || selectedVenu == 'Select Venu' || selectedVenu == '' || date.getTime() < new Date().getTime() || selectedDesigner == 'Select Designer' || selectedDesigner == '') {
            Alert.alert('Fillout Form First!', 'You are missing some info, plz have a look.', [{ text: 'Ok', style: 'destructive' }])
            return;
        }

        const invoice = {
            theme: value,
            menu,
            venu: selectedVenu,
            price: venuPrice + (menuPrice * peopleCount),
            eventName: value.toLowerCase(),
            isPackage: false,
            serPackName: 'custom',
            serPackId: 'no id', // there will be no service id so setting it to 'no id';
            userEmail: email,
            bookDate: new Date().toString(),
            occuredDate: date.toString(),
            designerName: selectedDesigner,
            noOfPeople: peopleCount,
            status: 'inprogress'
        }
        firebase.database().ref('pendingInvoices/').push(invoice).then((data) => {
            //success callback
            dispatch(addPendingInvoice({ ...invoice, id: data.key }))
            Alert.alert('Successfully added to Invoices', 'Please go to invoice section to clear first and continue.', [{ text: 'Ok' }])
            setSelectedMenu([]);
            setSelectedVenu('Select Venu')
            setVenuPrice('0')
            setMenuPrice('0')
            setPeopleCount('1')
            setSelectedDesigner('Select Designer')
        }).catch((error) => {
            //error callback
            Alert.alert("Can't book package.", 'Please check your internet connection!', [{ text: 'OK', style: 'destructive' }])
        })
    }

    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        setIsRefreshing(true);
        firebase.database().ref('events/').once('value', function (snapshot) {
            // dispatch(updateCorporate(snapshot.val()));

            const data = snapshot.val()
            const birth = data.birthday.items;
            const wed = data.wedding.items;
            const corp = data.corporate.items;
            dispatch(setItems(wed, birth, corp))
            setIsRefreshing(false);
        }, function (err) {
            setIsRefreshing(false);
            console.log('failed to fetch')
        });
    }, [])

    return (
        <ScrollView style={styles.screen}>
            {console.log('aaaaaaaaaaaaaaaaaaaaaaaaa', selectedMenu)}
            <Header navigation={props.navigation} custom />
            <ToggleButton.Row onValueChange={value => { setValue(value); setSelectedMenu([]); setMenuPrice(0); setVenuPrice(0) }} value={value} style={styles.toggleButtons}>
                <ToggleButton icon="heart" value="Wedding" />
                <ToggleButton icon="bonfire-sharp" value="Birthday" />
                <ToggleButton icon="thumbs-up-sharp" value="Corporate" />
            </ToggleButton.Row>
            <Text style={{ textAlign: 'center', fontFamily: 'joining', fontSize: 25 }}>{value}</Text>
            <View style={{ height: 1, width: '80%', backgroundColor: 'black', alignSelf: 'center', marginBottom: 20 }} />
            {isRefreshing ? <ActivityIndicator size={45} color={'blue'} /> : <>

                {/* theme---------------------------------------------- */}

                <View style={{ marginLeft: '5%' }}>
                    <Text style={{ color: 'grey' }}>Theme</Text>
                </View>
                <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                    <TextInput
                        value={value}
                        disabled
                    />
                </View>

                {/* Menu------------------------------------------------------------------- */}

                <View style={{ marginLeft: '5%', marginBottom: 20 }}>
                    <Text style={{ color: 'grey' }}>Menu</Text>
                </View>

                {value == 'Wedding' && (
                    <DataTable
                        list={weddingItems.filter(obj => obj['menu'])[0]['menu']}
                        handleSelectionMenu={handleSelectionMenu}
                    />
                )}
                {value == 'Birthday' && (
                    <DataTable
                        list={birthdayItems.filter(obj => obj['menu'])[0]['menu']}
                        handleSelectionMenu={handleSelectionMenu}
                    />
                )}
                {value == 'Corporate' && (
                    <DataTable
                        list={corporateItems.filter(obj => obj['menu'])[0]['menu']}
                        handleSelectionMenu={handleSelectionMenu}
                    />
                )}

                {/* Venu------------------------------------------------------------ */}

                <View style={{ marginLeft: '5%', marginTop: 10 }}>
                    <Text style={{ color: 'grey' }}>Venu</Text>
                </View>

                <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                    <Picker
                        style={{ width: '100%', height: 20 }}
                        selectedValue={selectedVenu}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedVenu(itemValue.name);
                            setVenuPrice(itemValue.price);
                            //here we want to calculate price
                        }
                        }>
                        <Picker.Item key={0} label={`Select Venu`} value={{ name: 'Select Venu', price: '0' }} />
                        {value == 'Corporate' && corporateItems.filter(obj => obj['venu'])[0]['venu'].map((item) => (
                            <Picker.Item key={item.id} label={`${item.name} -${item.price} Rs`} value={{ name: item.name, price: item.price }} />
                        ))
                        }
                        {value == 'Birthday' && birthdayItems.filter(obj => obj['venu'])[0]['venu'].map((item) => (
                            <Picker.Item key={item.id} label={`${item.name} -${item.price} Rs`} value={{ name: item.name, price: item.price }} />
                        ))
                        }
                        {value == 'Wedding' && weddingItems.filter(obj => obj['venu'])[0]['venu'].map((item) => (
                            <Picker.Item key={item.id} color={'black'} label={`${item.name} -${item.price} Rs`} value={{ name: item.name, price: item.price }} />
                        ))
                        }
                    </Picker>
                </View>

                {/* DateTime------------------------------------------------------------ */}

                <View style={{ marginLeft: '5%', marginTop: 10 }}>
                    <Text style={{ color: 'grey' }}>DateTime</Text>
                </View>

                <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Button icon="md-calendar-sharp" mode="contained" onPress={showDatepicker}>
                        Select Date
                </Button>
                    <Button icon="watch" mode="contained" onPress={showTimepicker}>
                        Select Time
                </Button>
                </View>

                {console.log(date)}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                {/* Designer ------------------------------------------------------------- */}

                <View style={{ marginLeft: '5%', marginTop: 10 }}>
                    <Text style={{ color: 'grey' }}>Designer</Text>
                </View>

                <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                    <Picker
                        style={{ width: '100%', height: 20 }}
                        selectedValue={selectedDesigner}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedDesigner(itemValue)
                        }>
                        <Picker.Item label="Select Designer" value="Select Designer" />
                        {designers.map(item => (
                            <Picker.Item label={item.name} value={item.name} />
                        ))}
                    </Picker>
                </View>

                {/* No of People---------------------------------------------------------- */}

                <View style={{ marginLeft: '5%', marginTop: 10 }}>
                    <Text style={{ color: 'grey' }}>People</Text>
                </View>

                <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 5, marginRight: '2.8%' }}>
                    <TextInput
                        label="Quantity"
                        value={peopleCount}
                        keyboardType={'number-pad'}
                        mode={'flat'}
                        onChangeText={value => {
                            if (+value) setPeopleCount(value)
                            else if (value == '') setPeopleCount('')
                        }}
                    />
                </View>

                {/* Total Price Label-------------------------------------------------------- */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'blue', fontSize: 45, fontFamily: 'webfont', paddingTop: 20 }}>Total:</Text>
                    <Text style={{ textAlign: 'center', color: 'blue', fontSize: 45, fontFamily: 'headings' }}>{+venuPrice + (menuPrice * peopleCount)}</Text>
                </View>

                {/* Book Event Button-------------------------------------------------------- */}

                <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                    <Button icon="save" mode="contained" onPress={onSubmitData}>
                        Book Event
                </Button>
                </View>
            </>}

        </ScrollView>
    );
}

export default IndividualService;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    toggleButtons: {
        justifyContent: 'center',
        margin: 20
    }
});
