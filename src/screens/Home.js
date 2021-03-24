import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from '../components/Carousel';
import { dummyData } from '../data/Data';

const Home = props => {
    useEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            headerTitle: "Home",
            headerTintColor: 'white',
            headerBackTitleStyle: {
                color: 'white'
            },
            headerTitleStyle: { 
                alignSelf: 'center'
            },
            headerStyle: {
                backgroundColor: 'blue',
            }
        });
    }, []);
    return (
        <Carousel data={dummyData} />

    );
}

export default Home;

const styles = StyleSheet.create({

});
