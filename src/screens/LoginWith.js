import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginWith = props => {
    useEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
            // headerTintColor: 'white'
        });
    }, [])
    return (
        <ImageBackground source={require('../../assets/images/login-background.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
            {/* <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,255, 0.6)', 'transparent']}
                style={styles.background}
            /> */}
            <Text style={styles.label}>
                Login As User
                </Text>
            <Text style={styles.label}>
                Login As Admin
                </Text>
        </View>
        </ImageBackground>
    );
}

export default LoginWith;



const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 900
    },
    container: {
        flex: 1,
        // backgroundColor: 'blue',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    label: {
        color: 'white'
    }
})
