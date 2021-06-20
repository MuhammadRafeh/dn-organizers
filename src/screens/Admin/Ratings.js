import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AdminHeader from '../../components/AdminHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setBookedEventWithRatings } from '../../redux/actions';

const Ratings = props => {

    const events = useSelector(state => state.bookedEvents.bookedEvents)
    const dispatch = useDispatch();

    const acceptReview = (ratings, eventName, designerName, bookedEventId, userEmail) => {
        // console.log(ratings, eventName, designerName, bookedEventId)
        Promise.all([
            firebase.database().ref('acceptedRatings/').push({ userEmail, eventName, ratings, designerName }),
            firebase.database().ref(`bookedEvents/${bookedEventId}`).update({ status: 'accepted' })
        ]).then((data) => {
            // console.log("Operations Successful", data)
            Alert.alert('Accepted!', 'This is now visible.', [{ text: 'Ok', style: 'destructive' }])
        }).catch((e) => {
            Alert.alert('Something went wrong!', 'Check your network.', [{ text: 'Ok', style: 'destructive' }])
        })
    }

    const rejectReview = (bookedEventId) => {
        Promise.all([
            firebase.database().ref(`bookedEvents/${bookedEventId}`).update({ status: 'rejected' })
        ]).then((data) => {
            // console.log("Operations Successful", data)
            Alert.alert('Rejected Successfully!', 'This will not visible.', [{ text: 'Ok', style: 'destructive' }])
        }).catch((e) => {
            Alert.alert('Something went wrong!', 'Check your network.', [{ text: 'Ok', style: 'destructive' }])
        })
    }

    const rating = [1, 2, 3, 4, 5];

    useEffect(() => {
        // getData();
        const ref = firebase.database().ref('bookedEvents/')
        ref.on('value', function (snapshot) {
            dispatch(setBookedEventWithRatings(snapshot.val()));
            console.log('done', snapshot.val())
        }, function (err) {
            console.log('failed to fetch', err)
        });

        //remove listener
        return () => ref.off('value');
    }, [])

    if (events.length == 0) {
        return (
            <>
                <AdminHeader navigation={props.navigation} reviews />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                        No Reviews to verify Anymore.
                    </Text>
                </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            <AdminHeader navigation={props.navigation} reviews />
            <FlatList
                data={events}
                renderItem={({ item }) => (

                    <View style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: 'grey' }}>
                        <View>
                            <Text style={{ textAlign: 'center', fontFamily: 'joining', fontSize: 20 }}>{item.userEmail}</Text>
                            <Text style={{ textAlign: 'center' }}>
                                {
                                    // item.ratings.ratingNumber
                                    rating.map((number, index) => {
                                        if (index < item.ratings.ratingNumber) {
                                            return <Ionicons key={index} name={'star'} size={23} color={'red'} />
                                        } return <Ionicons key={index} name={'star-outline'} size={23} color={'red'} />
                                    })
                                }
                            </Text>
                            <Text style={{ marginTop: 5, textAlign: 'center', fontFamily: 'headings' }}>
                                {item.ratings.ratingDesc}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button mode="text" onPress={acceptReview.bind(null, item.ratings, item.eventName, item.designerName, item.id, item.userEmail)}>
                                Accept
                            </Button>
                            <Button mode="text" onPress={rejectReview.bind(null, item.id)}>
                                Reject
                            </Button>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

export default Ratings;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});
