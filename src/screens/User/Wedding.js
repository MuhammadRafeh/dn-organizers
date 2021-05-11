import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import firebase from 'firebase';
import PackagesItem from '../../components/PackagesItem';
import Package from '../../models/package';
import { useDispatch, useSelector } from 'react-redux';
import { updateWedding } from '../../redux/actions';

const Wedding = props => {
    const dispatch = useDispatch();
    const packages = useSelector(state => state.packages.wedding);
    useEffect(() => {
        firebase.database().ref('events/wedding/packages').once('value', function (snapshot) {
            dispatch(updateWedding(snapshot.val()));
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

export default Wedding;

const styles = StyleSheet.create({
    screen: {
        paddingBottom: 80
    }
});
