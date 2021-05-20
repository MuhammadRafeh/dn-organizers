// User Side Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { ToggleButton } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';
import DataTables from '../../components/DataTable';

const IndividualService = props => {
    const [value, setValue] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('asd');
    const [selectedMenu, setSelectedMenu] = useState([]);

    const handleSelectionMenu = list => {
        setSelectedMenu(list);
    }

    return (
        <View style={styles.screen}>
            {console.log(selectedMenu)}
            <Header navigation={props.navigation} custom />
            <ToggleButton.Row onValueChange={value => setValue(value)} value={value} style={styles.toggleButtons}>
                <ToggleButton icon="heart" value="Wedding" />
                <ToggleButton icon="bonfire-sharp" value="Birthday" />
                <ToggleButton icon="thumbs-up-sharp" value="Corporate" />
            </ToggleButton.Row>
            <Text style={{ textAlign: 'center', fontFamily: 'joining', fontSize: 25 }}>{value}</Text>
            <View style={{ height: 1, width: '80%', backgroundColor: 'black', alignSelf: 'center', marginBottom: 20 }} />
            <View style={{ marginLeft: '5%' }}>
                <Text style={{ color: 'grey' }}>Theme</Text>
            </View>
            <View style={{ marginLeft: '2.8%', marginTop: 10, marginBottom: 19 }}>
                <Picker
                    style={{ width: '100%', height: 20 }}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Wedding" value="wedding" />
                    <Picker.Item label="Birthday" value="birthday" />
                    <Picker.Item label="Corporate" value="corporate" />
                </Picker>
            </View>
            <View style={{ marginLeft: '5%', marginBottom: 20 }}>
                <Text style={{ color: 'grey' }}>Menu</Text>
            </View>

            <DataTables list={[{name: 'name', price: 232}, {name: 'asd', price: 2323}]} handleSelectionMenu={handleSelectionMenu}/>
        </View>
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
