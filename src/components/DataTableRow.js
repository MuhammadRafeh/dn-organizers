import React, { useState } from 'react';
import { View, Text, StyleSheet, TextPropTypes } from 'react-native';
import { Checkbox } from 'react-native-paper';

const DataTableRow = props => {

    const [checked, setChecked] = useState(false);

    return (
        <>
            <View style={{ height: 0.2, backgroundColor: 'grey', width: '100%', marginTop: 18, marginBottom: 12 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 15 }} numberOfLines={1}>Salad raita</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginRight: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: 'black', textAlign: 'right', fontSize: 14.5 }} numberOfLines={1}>159</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        {/* <Text style={{ color: 'black', textAlign: 'right', paddingLeft: 15, fontSize: 14.5 }} numberOfLines={1}>seasdasdasdlect</Text> */}
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                    </View>
                </View>
            </View>

            <View style={{ height: 1, backgroundColor: '#e3e3e3', marginTop: 10 }} />
        </>
    );
}

export default DataTableRow;
