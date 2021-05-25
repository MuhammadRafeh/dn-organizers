// User Side Screen
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setBookedEvents } from '../../redux/actions';

const BookedEvents = props => {

    const dispatch = useDispatch();
    const [events, email] = useSelector(state => [state.bookedEvents.bookedEvents, state.auth.email])
    
    const getData = () => {
        firebase.database().ref('bookedEvents/').once('value', function (snapshot) {
            dispatch(setBookedEvents(snapshot.val(), email));
            console.log('done', snapshot.val())
        }, function (err) {
            console.log('failed to fetch', err)
        });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <View style={styles.screen}>
            {console.log('asdasd',events)}
            <Header navigation={props.navigation} bookedEvents />
            <FlatList 
                
            />
        </View>
    );
}

export default BookedEvents;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
