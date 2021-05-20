// User Side Screen
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Header from '../../components/Header';
import { ToggleButton } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import DataTables from '../../components/DataTable';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../redux/actions';

const IndividualService = props => {
    const [value, setValue] = useState('');
    const [selectedVenu, setSelectedVenu] = useState('');
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [peopleCount, setPeopleCount] = useState();
    const [selectedDesigner, setSelectedDesigner] = useState('')

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const { weddingItems, birthdayItems, corporateItems } = useSelector(state => state.items);

    const handleSelectionMenu = list => {
        setSelectedMenu(list);
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

    }

    useEffect(() => {
        firebase.database().ref('events/').once('value', function (snapshot) {
            // dispatch(updateCorporate(snapshot.val()));

            const data = snapshot.val()
            const birth = data.birthday.items;
            const wed = data.wedding.items;
            const corp = data.corporate.items;
            dispatch(setItems(wed, birth, corp))
            // setIsRefreshing(false);
        }, function (err) {
            // setIsRefreshing(false);
            console.log('failed to fetch')
        });
    }, [])

    return (
        <ScrollView style={styles.screen}>
            {console.log('aaaaaaaaaaaaaaaaaaaaaaaaa', selectedMenu)}
            <Header navigation={props.navigation} custom />
            <ToggleButton.Row onValueChange={value => { setValue(value); setSelectedMenu([]) }} value={value} style={styles.toggleButtons}>
                <ToggleButton icon="heart" value="Wedding" />
                <ToggleButton icon="bonfire-sharp" value="Birthday" />
                <ToggleButton icon="thumbs-up-sharp" value="Corporate" />
            </ToggleButton.Row>
            <Text style={{ textAlign: 'center', fontFamily: 'joining', fontSize: 25 }}>{value}</Text>
            <View style={{ height: 1, width: '80%', backgroundColor: 'black', alignSelf: 'center', marginBottom: 20 }} />
            <View style={{ marginLeft: '5%' }}>
                <Text style={{ color: 'grey' }}>Theme</Text>
            </View>
            <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                {/* <Picker
                    style={{ width: '100%', height: 20 }}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Wedding" value="wedding" />
                    <Picker.Item label="Birthday" value="birthday" />
                    <Picker.Item label="Corporate" value="corporate" />
                </Picker> */}
                <TextInput
                    value={value}
                    disabled
                />
            </View>
            <View style={{ marginLeft: '5%', marginBottom: 20 }}>
                <Text style={{ color: 'grey' }}>Menu</Text>
            </View>

            {value == 'Wedding' && (
                <DataTables
                    list={weddingItems.filter(obj => obj['menu'])[0]['menu']}
                    handleSelectionMenu={handleSelectionMenu}
                />
            )}
            {value == 'Birthday' && (
                <DataTables
                    list={birthdayItems.filter(obj => obj['menu'])[0]['menu']}
                    handleSelectionMenu={handleSelectionMenu}
                />
            )}
            {value == 'Corporate' && (
                <DataTables
                    list={corporateItems.filter(obj => obj['menu'])[0]['menu']}
                    handleSelectionMenu={handleSelectionMenu}
                />
            )}


            <View style={{ marginLeft: '5%', marginTop: 10 }}>
                <Text style={{ color: 'grey' }}>Venu</Text>
            </View>

            <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                <Picker
                    style={{ width: '100%', height: 20 }}
                    selectedValue={selectedVenu}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedVenu(itemValue)
                    }>
                    {value == 'Corporate' && corporateItems.filter(obj => obj['venu'])[0]['venu'].map((item, index) => (
                        <Picker.Item key={index} label={`${item.name} -${item.price} Rs`} value={item.name} />
                    ))
                    }
                    {value == 'Birthday' && birthdayItems.filter(obj => obj['venu'])[0]['venu'].map((item, index) => (
                        <Picker.Item key={index} label={`${item.name} -${item.price} Rs`} value={item.name} />
                    ))
                    }
                    {value == 'Wedding' && weddingItems.filter(obj => obj['venu'])[0]['venu'].map((item, index) => (
                        <Picker.Item key={index} label={`${item.name} -${item.price} Rs`} value={item.name} />
                    ))
                    }
                </Picker>
            </View>

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
                    <Picker.Item label="Wedding" value="wedding" />
                    <Picker.Item label="Birthday" value="birthday" />
                    <Picker.Item label="Corporate" value="corporate" />
                </Picker>
            </View>

            <View style={{ marginLeft: '5%', marginTop: 10 }}>
                <Text style={{ color: 'grey' }}>People</Text>
            </View>

            <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                <TextInput
                    label="Quantity"
                    value={peopleCount}
                    keyboardType={'number-pad'}
                    mode={'flat'}
                    onChangeText={value => setPeopleCount(value)}
                />
            </View>

            <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                <Button icon="save" mode="contained" onPress={onSubmitData}>
                    Book Event
                </Button>
            </View>
                    
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
