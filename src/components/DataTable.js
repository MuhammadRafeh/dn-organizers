import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DataTableRow from './DataTableRow';

const DataTable = props => {

    return (
        <>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={{ color: 'grey', fontSize: 12 }}>Name</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginRight: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right' }}>Price</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right', paddingLeft: 15, paddingRight: 4 }}>Select</Text>
                    </View>
                </View>
            </View>

            <DataTableRow />
        </>
    );
}

export default DataTable;
