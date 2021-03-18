import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonTitle, setButtonTitle] = useState('USER LOGIN');

    const inputHandler = (type, value) => {
        if (type === 'email') {
            setEmail(value);
        }
        else if (type === 'password') {
            setPassword(value);
        }
    }

    const screenTouchHandler = () => {
        Keyboard.dismiss();
    }

    return (

        <ImageBackground source={require('../../assets/images/login-background.jpg')} style={styles.backgroundImage}>
            <TouchableOpacity style={styles.screen} activeOpacity={1} onPress={screenTouchHandler}>

                <View style={styles.loginLabel}>
                    <Text style={styles.label}>
                        LOGIN
                </Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.textInput}>
                        <TextInput
                            label="Email"
                            // mode="outlined"
                            value={email}
                            // left={() => <Text style={{ color: 'black' }}>hello</Text>}
                            onChangeText={inputHandler.bind(null, 'email')}
                            left={<TextInput.Icon name="mail" size={25} color={'blue'} />}
                        />
                    </View>

                    <TextInput
                        label="Password"
                        // mode="outlined"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={inputHandler.bind(null, 'password')}
                        left={<TextInput.Icon name="lock-closed" size={25} color={'blue'} />}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button icon="person" mode="contained" style={styles.button} onPress={() => console.log('Pressed')}>
                        {buttonTitle}
                    </Button>
                </View>
                <View style={styles.lastRow}>
                    <TouchableOpacity onPress={() => { console.log('Create Account Pressed') }}>
                        <Text style={styles.lastRowText}>
                            Create Account
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { console.log('Create Account Pressed') }}>
                        <Text style={styles.lastRowText}>
                            Forget Password?
                    </Text>
                    </TouchableOpacity>
                </View>


            </TouchableOpacity>
        </ImageBackground>
    );
}

export default Login;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 110
    },

    loginLabel: {
        marginBottom: 40
    },

    label: {
        fontFamily: 'headings',
        fontSize: 25,
        color: 'white'
    },

    inputContainer: {
        width: width - 35,
        marginBottom: 20
    },

    buttonContainer: {
        backgroundColor: 'blue',
        width: width - 35,
        borderRadius: 4
    },

    lastRow: {
        marginTop: 5,
        width: width - 35,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    lastRowText: {
        color: 'white'
    },

    backgroundImage: {
        width: '100%',
        height: '100%'
    },

    textInput: {
        marginBottom: 1
    }

});
