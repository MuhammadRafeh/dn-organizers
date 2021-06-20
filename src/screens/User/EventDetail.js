import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { events } from '../../data/Data';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

const EventDetail = props => {

    const { navigation, route } = props;

    const [ratings, setRatings] = useState([]); //[{eventName: str, ratings: obj, designerName: str, userEmail: str}]

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: route.params?.name
        });
    }, [navigation]);

    const eventName = route.params?.name;
    const event = events.filter((event) => {
        if (event.title == eventName) {
            return true
        }
        return false;
    })[0];

    const ratingsNum = [1, 2, 3, 4, 5];

    useEffect(() => {
        const ref = firebase.database().ref('acceptedRatings/')
        ref.on('value', function (snapshot) {
            // console.log(snapshot.val());
            const transformedData = [];
            for (let id in snapshot.val()) {
                const obj = snapshot.val()[id];
                transformedData.push(
                    // new UserClear(id, obj.bankAddress, obj.branchCode, obj.date, obj.pendingInvoiceId, obj.invoiceData, obj.userEmail)
                    { eventName: obj.eventName, ratings: obj.ratings, designerName: obj.designerName, userEmail: obj.userEmail }
                )
            }
            setRatings([...transformedData]);
        });

        //remove listener
        return () => ref.off('value');
    }, [])

    return (
        <ScrollView>
            <Image source={event.source} style={styles.image} resizeMode={'cover'} />
            <Text style={styles.description}>{event.desc}</Text>
            <View style={styles.ratingsContainer}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 35, textShadowColor: 'white', fontFamily: 'webfont' }}>Ratings</Text>
                </View>
                {/* <Button title={'View Packages'} onPress={() => { console.log('packages') }} /> */}
                {ratings.map((rating, index) => {
                    if (eventName.toLowerCase() == rating.eventName.toLowerCase()) {
                        return <View key={index} style={{ padding: 10, marginVertical: 5 }}>
                            <View style={{ alignItems: 'center', width: '76%', alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'joining' }} numberOfLines={1} adjustsFontSizeToFit={true}>{rating.userEmail}</Text>
                            </View>
                            <View style={{ alignItems: 'center', width: '78%', alignSelf: 'center' }}>
                                <Text style={{ textAlign: 'center' }} numberOfLines={1} adjustsFontSizeToFit={true}>
                                    {
                                        // item.ratings.ratingNumber
                                        ratingsNum.map((number, index) => {
                                            if (index < rating.ratings.ratingNumber) {
                                                return <Ionicons key={index} name={'star'} size={23} color={'red'} />
                                            } return <Ionicons key={index} name={'star-outline'} size={23} color={'red'} />
                                        })
                                    }
                                </Text>
                                <Text style={{textAlign: 'center'}}>
                                    {rating.ratings.ratingDesc}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10, width: '76%', alignSelf: 'center'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{ textAlign: 'left', color: 'grey' }} numberOfLines={1} adjustsFontSizeToFit={true}>Designer Name:</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'center'}}>
                                        {rating.designerName}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ height: 1, backgroundColor: 'grey', width: '80%', alignSelf: 'center', marginTop: 10 }} />
                        </View>
                    } return <View key={index} />
                })}
            </View>
        </ScrollView>
    );
}

export default EventDetail;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        fontFamily: 'joining'
    },
    ratingsContainer: {
        marginHorizontal: 20,
    }
});
