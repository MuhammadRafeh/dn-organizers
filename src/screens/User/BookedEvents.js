// User Side Screen
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Header from '../../components/Header';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setBookedEvents, updateBookedEvents } from '../../redux/actions';
import BookedEvent from '../../components/BookedEvent';


const BookedEvents = props => {

    const dispatch = useDispatch();
    const [events, email] = useSelector(state => [state.bookedEvents.bookedEvents, state.auth.email])
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const getData = () => {
        setIsRefreshing(true);
        firebase.database().ref('bookedEvents/').once('value', function (snapshot) {
            dispatch(setBookedEvents(snapshot.val(), email));
            console.log('done', snapshot.val())
            setIsRefreshing(false);
        }, function (err) {
            setIsRefreshing(false);
            Alert.alert('Something went wrong!', 'Please check your network.', [{ text: 'Ok', style: 'destructive' }])
        });
    }

    useEffect(() => {
        getData();
    }, [])

    const onSubmitReview = (id, ratings, desc) => {
        // console.log(id, ratings, desc)
        const ratingObj = {
            ratingNumber: ratings,
            ratingDesc: desc
        };
        firebase.database().ref(`bookedEvents/${id}`).update({
            status: 'usergivedreview',
            ratings: ratingObj
        }).then(() => {
            Alert.alert('Thanks for giving Review!', 'Your review will appear after Admin Acceptance.', [{ text: 'Ok', style: 'destructive' }])
            dispatch(updateBookedEvents(id, ratingObj, 'usergivedreview'));
        }).catch((err) => {
            Alert.alert('Something went wrong!', err.message, [{ text: 'Ok', style: 'destructive' }])
        });
    }

    // if (events.length == 0) {
    //     return (
    //         <>
    //             <Header navigation={props.navigation} bookedEvents />
    //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //                 <Text style={{ textAlign: 'center', color: 'grey' }}>
    //                     You have not booked any Event yet!
    //                 </Text>
    //             </View>
    //         </>
    //     )
    // }

    return (
        <View style={styles.screen}>
            {console.log('asdasd------------------------------', events)}
            <Header navigation={props.navigation} bookedEvents />
            <FlatList
                onRefresh={getData}
                refreshing={isRefreshing}
                data={events}
                renderItem={({ item }) => {
                    return <BookedEvent item={item} onSubmitReview={onSubmitReview} />
                }}
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
