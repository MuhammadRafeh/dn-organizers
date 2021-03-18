import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <TouchableOpacity style={styles.screen} activeOpacity={1} onPress={screenTouchHandler}>
            
            <View style={styles.loginLabel}>
                <Text>
                    LOGIN
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    label="Email"
                    mode="outlined"
                    value={email}
                    // left={() => <Text style={{ color: 'black' }}>hello</Text>}
                    onChangeText={inputHandler.bind(null, 'email')}
                    left={<TextInput.Icon name="mail" size={25} color={'blue'} />}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={inputHandler.bind(null, 'password')}
                    left={<TextInput.Icon name="lock-closed" size={25} color={'blue'} />}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button icon="person" mode="contained" style={styles.button} onPress={() => console.log('Pressed')}>
                    Press me
                </Button>
            </View>
            {/* <View style={styles.}>

            </View> */}

        </TouchableOpacity>
    );
}

export default Login;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 110
    },
    loginLabel: {
        marginBottom: 30
    },
    inputContainer: {
        width: width - 35,
        marginBottom: 20
    },
    buttonContainer: {
        backgroundColor: 'green',
        width: width - 35
    },

});
