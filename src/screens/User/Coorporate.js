import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import firebase from 'firebase';
import PackagesItem from '../../components/PackagesItem';
import { useSelector, useDispatch } from 'react-redux';
import { updateCorporate } from '../../redux/actions';

const Coorporate = props => {
    const dispatch = useDispatch();
    const packages = useSelector(state => state.packages.corporate);
    useEffect(() => {
        firebase.database().ref('events/corporate/packages').once('value', function (snapshot) {
            dispatch(updateCorporate(snapshot.val()));
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

export default Coorporate;

const styles = StyleSheet.create({
    screen: {
        paddingBottom: 80
    }
});
