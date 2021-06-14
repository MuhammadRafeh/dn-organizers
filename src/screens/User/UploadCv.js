import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, RadioButton, Button } from 'react-native-paper';
import Header from '../../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import CvForm from '../../models/cvForm';

const UploadCv = props => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [cnic, setCnic] = useState('');
    const [experience, setExperience] = useState('');
    const [selectedWorkPost, setSelectedWorkPost] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');
    const [checked, setChecked] = React.useState('no');

    const onSubmitData = () => {

        if (firstName.length <= 0 || lastName.length <= 0 || phone.length <= 0 || email.length <= 0 || cnic.length <= 0 || experience.length <= 0 || selectedEvent == '' || selectedEvent == 'Select Event' || selectedWorkPost == '' || selectedWorkPost == 'Work As a') {
            Alert.alert('Fillout Form first!', 'Fillout in order to continue.', [{text: 'OK', style: 'destructive'}])
            return;
        }
        const cvData = new CvForm(
            firstName,
            lastName,
            phone,
            selectedWorkPost,
            selectedEvent,
            cnic,
            email,
            experience,
            checked == 'no' ? false : true
        )
        firebase.database().ref("viewInfo/cv").push(cvData)
            .then(() => Alert.alert("Submitted Successfully!", "You will receive Email soon.", [{text: 'OK', style: 'destructive'}]))
            .catch(() => Alert.alert("Something went wrong!", "Please check your internet connection.", [{text: 'OK', style: 'destructive'}]))
    }

    // DATE-----------------------------------------------

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };


    const showDatepicker = () => {
        showMode('date');
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    // END DATE------------------------------------------

    return (
        <ScrollView style={styles.screen}>
            <Header cvUpload navigation={props.navigation} />
            <View style={{ ...styles.textInput, marginTop: 10 }}>
                <TextInput
                    label="First Name"
                    placeholder={'Enter your first name'}
                    value={firstName}
                    onChangeText={setFirstName}
                    left={
                        <TextInput.Icon name="person-outline" size={25} color={"blue"} />
                    }
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                    label="Last Name"
                    placeholder={'Enter your last name'}
                    value={lastName}
                    onChangeText={setLastName}
                    left={
                        <TextInput.Icon name="person-outline" size={25} color={"blue"} />
                    }
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                    label="Phone"
                    placeholder={'Enter your phone'}
                    value={phone}
                    onChangeText={setPhone}
                    left={
                        <TextInput.Icon name="phone-portrait-outline" size={25} color={"blue"} />
                    }
                />
            </View>
            {/* ------------------------------------------- */}
            {/* <Button icon="md-calendar-sharp" mode="contained" onPress={showDatepicker}>
                Select Date
            </Button> */}
            <TouchableOpacity onPress={showDatepicker}>
                <View style={{ marginBottom: 10, marginHorizontal: '5%', borderWidth: 1, borderColor: 'grey', padding: 15 }}>
                    <Text style={{ color: 'blue', fontFamily: 'descent' }}>{date.toDateString()}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ marginLeft: '3.5%', marginTop: 10, marginBottom: 19, marginRight: '2.1%' }}>
                <Picker
                    style={{ width: '100%', height: 20 }}
                    selectedValue={selectedEvent}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedEvent(itemValue.name);
                    }
                    }>
                    <Picker.Item key={0} label={`Select Event`} value={{ name: 'Select Event' }} />
                    <Picker.Item key={1} label={`Wedding`} value={{ name: 'Wedding' }} />
                    <Picker.Item key={2} label={`Birthday`} value={{ name: 'Birthday' }} />
                    <Picker.Item key={3} label={`Corporate`} value={{ name: 'Corporate' }} />

                </Picker>
            </View>
            <View style={{ marginLeft: '3.5%', marginTop: 10, marginBottom: 19, marginRight: '2.1%' }}>
                <Picker
                    style={{ width: '100%', height: 20 }}
                    selectedValue={selectedWorkPost}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedWorkPost(itemValue.name);
                    }
                    }>
                    <Picker.Item key={0} label={`Work As a`} value={{ name: 'Work As a' }} />
                    <Picker.Item key={1} label={`Designer`} value={{ name: 'Designer' }} />
                    <Picker.Item key={2} label={`Management`} value={{ name: 'Management' }} />
                    <Picker.Item key={3} label={`Catering`} value={{ name: 'Catering' }} />

                </Picker>
            </View>
            {/* ------------------------------------------- */}
            <View style={styles.textInput}>
                <TextInput
                    label="Email Address"
                    placeholder={'Enter your email'}
                    value={email}
                    onChangeText={setEmail}
                    left={
                        <TextInput.Icon name="mail-outline" size={25} color={"blue"} />
                    }
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                    label="CNIC"
                    placeholder={'Enter your CNIC'}
                    value={cnic}
                    onChangeText={setCnic}
                    left={
                        <TextInput.Icon name="card-outline" size={25} color={"blue"} />
                    }
                />
            </View>
            <View style={styles.textInput}>
                <TextInput
                    label="Experience"
                    placeholder={'Enter your experience'}
                    value={experience}
                    onChangeText={setExperience}
                    numberOfLines={3}
                    multiline={true}
                    left={
                        <TextInput.Icon name="ios-logo-yen" size={25} color={"blue"} />
                    }
                />
            </View>
            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                <Text style={{ color: 'grey' }}>
                    Are you from Pakistan?
                </Text>
            </View>
            <View style={{ marginHorizontal: '5%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>
                        Yes
                    </Text>
                    <RadioButton
                        value="yes"
                        status={checked === 'yes' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('yes')}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>
                        No
                    </Text>
                    <RadioButton
                        value="no"
                        status={checked === 'no' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('no')}
                    />
                </View>

            </View>

            <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19, marginRight: '2.8%' }}>
                <Button icon="save" mode="contained" onPress={onSubmitData}>
                    upload cv
                </Button>
            </View>

            {/* Radio Button below */}
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
        </ScrollView>
    );
}

export default UploadCv;


const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    textInput: {
        marginBottom: 10,
        paddingHorizontal: '5%',
        overflow: 'hidden',
        borderRadius: 10
    }
});
