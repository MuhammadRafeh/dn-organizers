import { useHeaderHeight } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
import Carousel from '../../components/Carousel';
import { dummyData, events } from '../../data/Data';
import EventsItem from '../../components/EventsItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';

const Home = props => {
    
    const headerHeight = useHeaderHeight();
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: "Home",
            headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        props.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>,
        });
    }, []);
    return (
        <>
            <ScrollView>
                <Carousel data={dummyData} />
                <View style={styles.servicesContainer}>
                    <Text style={styles.label}>Top Demanding Events</Text>
                </View>
                {events.map((event, key) => (
                    <EventsItem
                        key={key.toString()}
                        onSelect={() => {props.navigation.navigate('eventdetail', {"name": event.title})}}
                        image={event.source}
                        title={event.title}
                        description={event.desc}
                    />
                ))}
            </ScrollView>
            <BackgroundImage source={require('../../../assets/images/home_background.jpg')} headerHeight={headerHeight} />
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
