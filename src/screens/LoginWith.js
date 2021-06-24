import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import { useHeaderHeight } from "@react-navigation/stack";
import { Button } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get('window');

const LoginWith = props => {
    const headerHeight = useHeaderHeight();

    const handleLogin = (type) => {
        if (type === 'user') {
            props.navigation.navigate('login', { loginBy: 'user' })
        }
        if (type === 'admin') {
            props.navigation.navigate('login', { loginBy: 'admin' })
        }
    }

    return (
        <View style={styles.container}>
            <View style={{marginLeft: 40, flex: 1, marginTop: 60}}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    resizeMode={'contain'}
                    style={{width: 200, height: 200}}
                />
            </View>
            <View style={{ marginTop: height / 6, flex: 2 }}>
                <View style={{ marginBottom: 20, width: 150 }}>
                    <LinearGradient colors={['#00dbde', '#fc00ff']}>
                        <Button icon="people" color='white' mode="outlined" onPress={handleLogin.bind(null, 'user')}>
                            User Login
                        </Button>
                    </LinearGradient>
                    </View>
                <View style={{ width: 150 }}>
                    <LinearGradient colors={['#00dbde', '#fc00ff']}>
                        <Button icon="md-person-circle" color='white' mode="outlined" onPress={handleLogin.bind(null, 'admin')}>
                            Admin Login
                        </Button>
                    </LinearGradient>

                </View>
            </View>
            <BackgroundImage
                source={require('../../assets/images/login1.jpeg')}
                headerHeight={headerHeight}
            />
        </View>
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
        // justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: 'white'
    }
})
