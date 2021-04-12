import { useHeaderHeight } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import { dummyData } from '../data/Data';


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
                <View style={styles.cardContainer}>
                    <Card
                        source={require('../../assets/images/wedding.jpeg')}
                        title={"Wedding"}
                        paragraph={'We provide Destination Weddings and make your precious days one to never forget. Best services, cattering, Photoshoot and many more. '}
                    />
                </View>
                <View style={styles.cardContainer}>
                    <Card
                        source={require('../../assets/images/birthday.jpeg')}
                        title={"Birthday"}
                        paragraph={'Make your new days as you desire. We provide best services and all new & Astonishing themes to make your special days more special & memorable'}
                    />
                </View>
                <View style={styles.cardContainer}>
                    <Card
                        source={require('../../assets/images/corporate1.jpeg')}
                        title={"Corporate"}
                        paragraph={'We provide Destination Coorporate and make your precious days one to never forget. Best services, cattering, Photoshoot and many more. '}
                    />
                </View>

            </ScrollView>
            <BackgroundImage source={require('../../assets/images/home_background.jpg')} headerHeight={headerHeight} />
        </>
    );
}

export default Home;

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 5
    }
});
