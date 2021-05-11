import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';
import firebase from "firebase";
import PackagesItem from '../../components/PackagesItem';
import { useSelector, useDispatch } from 'react-redux';
import { updateBirthday } from '../../redux/actions';

const Birthday = props => {
    const dispatch = useDispatch();
    const packages = useSelector(state => state.packages.birthday);
    useEffect(() => {
        firebase.database().ref('events/birthday/packages').once('value', function (snapshot) {
            dispatch(updateBirthday(snapshot.val()));
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

export default Birthday;

const styles = StyleSheet.create({
    screen: {
        paddingBottom: 80
    }
});
