import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';
import Package from '../../models/package';
import firebase from "firebase";
import PackagesItem from '../../components/PackagesItem';

const Birthday = props => {
    const [packages, setPackages] = useState([]);
    useEffect(() => {
        firebase.database().ref('events/birthday/packages').once('value', function (snapshot) {
            // new Package()
            const transformData = [];
            const response = snapshot.val();
            for (let id in response) {
                transformData.push(
                    new Package(id, response[id].name, response[id].price, response[id].theme, response[id].menu, response[id].venu)
                )
            }
            setPackages(transformData);
        });
    }, [])

    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} />
            <FlatList
                contentContainerStyle={{ padding: 20 }}
                data={packages}
                renderItem={(item) => {
                    return <PackagesItem name={item.item.name} price={item.item.price} theme={item.item.theme} venu={item.item.venu} menu={item.item.menu} />
                }}
            />
        </View>
    );
}

export default Birthday;

const styles = StyleSheet.create({
    screen: {
        paddingBottom: 80
    }
});
