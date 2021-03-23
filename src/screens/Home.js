import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from '../components/Carousel';
import { dummyData } from '../data/Data';

const Home = props => {
    return (
        <Carousel data={dummyData} />
    );
}

export default Home;

const styles = StyleSheet.create({

});
