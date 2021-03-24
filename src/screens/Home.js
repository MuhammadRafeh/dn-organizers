import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
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
        <ScrollView>
        <Carousel data={dummyData} />
        <Card
            source={{ uri: 'https://picsum.photos/700' }}
            title={"Wedings"}
            paragraph={'Awesome React Native Card'}
        />
        </ScrollView>
    );
}

export default Home;

const styles = StyleSheet.create({

});
