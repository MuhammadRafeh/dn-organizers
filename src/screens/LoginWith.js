import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import { useHeaderHeight } from "@react-navigation/stack";
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const LoginWith = props => {
    const headerHeight = useHeaderHeight();

    const handleLogin = (type) => {
        if (type === 'user') {
            props.navigation.navigate('login', {loginBy: 'user'})
        }
        if (type === 'admin') {
            props.navigation.navigate('login', {loginBy: 'admin'})
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={{marginBottom: 20, width: 150}}>
                <Button icon="people" color='white' mode="outlined" onPress={handleLogin.bind(null, 'user')}>
                    User Login
                </Button>
            </View>
            <View style={{width: 150}}>
                <Button icon="md-person-circle" color='white' mode="outlined" onPress={handleLogin.bind(null, 'admin')}>
                    Admin Login
                </Button>
            </View>
            <BackgroundImage
                source={require('../../assets/images/login-background.jpg')}
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: 'white'
    }
})
