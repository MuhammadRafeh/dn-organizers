import { useHeaderHeight } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import Card from '../components/EventsItem';
import Carousel from '../components/Carousel';
import { dummyData, events } from '../data/Data';
import EventsItem from '../components/EventsItem';


const Home = props => {
    const headerHeight = useHeaderHeight();
    useEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            headerTitle: "Home",
            headerTintColor: 'white',
            headerBackTitleStyle: {
                color: 'black'
            },
            headerTitleStyle: {
                alignSelf: 'center',
                fontFamily: 'headings',
                fontSize: 30
            },
            // headerTransparent: true
            // headerStyle: {
            //     backgroundColor: 'blue',
            // },
            headerBackground: () => (
                <LinearGradient
                    colors={['#a13388', '#10356c']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            ),
        });
    }, []);
    return (
        <>
            <ScrollView>
                {/* <ScrollView contentContainerStyle={{marginTop: headerHeight}}> */}
                <Carousel data={dummyData} />
                <View style={styles.servicesContainer}>
                    <Text style={styles.label}>Top Demanding Events</Text>
                </View>
                {events.map((event, key) => (
                    <EventsItem
                        key={key.toString()}
                        onSelect={() => { }}
                        image={event.source}
                        title={event.title}
                        description={event.desc}
                    />
                ))}
            </ScrollView>
            <BackgroundImage source={require('../../assets/images/home_background.jpg')} headerHeight={headerHeight} />
        </>
    );
}

export default Home;

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 15
    },
    servicesContainer: {
        alignItems: 'center',
        // marginBottom: 5,
        marginTop: 20
    },
    label: {
        color: 'white',
        fontFamily: 'subHeadings',
        fontSize: 35,
        // fontWeight: 40,
        // textDecorationLine: 'underline',
        textShadowColor: 'white',
        fontFamily: 'webfont'
    }
});
