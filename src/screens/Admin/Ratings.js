import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AdminHeader from '../../components/AdminHeader';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setBookedEventWithRatings } from '../../redux/actions';

const Ratings = props => {

    const [events, email] = useSelector(state => [state.bookedEvents.bookedEvents, state.auth.email])
    const dispatch = useDispatch();

    const getData = () => {
        firebase.database().ref('bookedEvents/').on('value', function (snapshot) {
            dispatch(setBookedEventWithRatings(snapshot.val(), email));
            console.log('done', snapshot.val())
        }, function (err) {
            console.log('failed to fetch', err)
        });
    }

    const rating = [1, 2, 3, 4, 5]

    useEffect(() => {
        getData();
    }, [])
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
                                {/* <Ionicons name={'star'} size={23} color={'red'} />
                                <Ionicons name={'star'} size={23} color={'red'} />
                                <Ionicons name={'star'} size={23} color={'red'} />
                                <Ionicons name={'star-outline'} size={23} color={'red'} /> */}
                            </Text>
                            <Text style={{ marginTop: 5, textAlign: 'center', fontFamily: 'headings' }}>
                                {item.ratings.ratingDesc}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button mode="text" onPress={() => { }}>
                                Accept
                            </Button>
                            <Button mode="text" onPress={() => { }}>
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
