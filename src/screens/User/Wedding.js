import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import firebase from 'firebase';
import PackagesItem from '../../components/PackagesItem';
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

    const handleBookPress = id => {
        console.log(id)
    }

    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} />
            <FlatList
                contentContainerStyle={{ padding: 20 }}
                data={packages}
                renderItem={(item) => {
                    return <PackagesItem
                        // id={item.item.id}
                        name={item.item.name}
                        price={item.item.price}
                        theme={item.item.theme}
                        venu={item.item.venu}
                        menu={item.item.menu}
                        handleBookPress={() => {handleBookPress(item.item.id)}}
                    />
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
