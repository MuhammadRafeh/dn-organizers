import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DataTableRow from './DataTableRow';

const DataTable = props => {
    // props will be array of objects
    const [selectedData, setSelectedData] = useState([]);
    const getRowSelectedData = obj => {
        if (obj.checked) {
            //here we add the item
            const data = [...selectedData, obj]
            setSelectedData(data);
            props.handleSelectionMenu(data);
            return
        } else{
            //here we want to remove item from list
            const data = selectedData.filter(item => item.id != obj.id);
            setSelectedData(data);
            props.handleSelectionMenu(data);
        }
    }

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

            <View style={{ height: 0.2, backgroundColor: 'grey', width: '100%', marginTop: 18, marginBottom: 10 }} />

            {props.list && props.list.map((item, index) => <DataTableRow key={index} data={{ ...item, id: index }} getRowSelectedData={getRowSelectedData} />)}
        </>
    );
}

export default DataTable;
