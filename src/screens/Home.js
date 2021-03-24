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
                color: 'white'
            },
            headerTitleStyle: {
                alignSelf: 'center',
                fontFamily: 'headings',
                fontSize: 30
            },
            headerTransparent: true
            // headerStyle: {
            //     backgroundColor: 'blue',
            // },
            // headerBackground: () => (
            //     <LinearGradient
            //         colors={['#a13388', '#10356c']}
            //         style={{ flex: 1 }}
            //         start={{ x: 0, y: 0 }}
            //         end={{ x: 1, y: 0 }}
            //     />
            // ),
        });
    }, []);
    return (
        <>
            <ScrollView contentContainerStyle={{marginTop: headerHeight}}>
                <Carousel data={dummyData} />
                <View style={styles.cardContainer}>
                    <Card
                        source={{ uri: 'https://picsum.photos/700' }}
                        title={"Wedding"}
                        paragraph={'Awesome React Native Card'}
                    />
                </View>
                <Card
                    source={{ uri: 'https://picsum.photos/700' }}
                    title={"Birthday"}
                    paragraph={'Awesome React Native Card'}
                />
                <Card
                    source={{ uri: 'https://picsum.photos/700' }}
                    title={"Corperate Events"}
                    paragraph={'Awesome React Native Card'}
                />
            </ScrollView>
            <BackgroundImage source={require('../../assets/images/login-background.jpg')} headerHeight={headerHeight} />
        </>
    );
}

export default Home;

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 5
    }
});
