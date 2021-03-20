import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
// import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from "@react-navigation/stack";
import BackgroundImage from "../components/BackgroundImage";

const { width, height } = Dimensions.get("window");

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Login = (props) => {
    let headerHeight = useHeaderHeight();
    const loginBy = props.route.params?.loginBy; //value can be user or admin
    const isSignup = props.route.params?.signup === 'signup';

    useEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: 'white',
            headerBackTitleStyle: {
                color: 'white'
            }
        });
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailPressed, setIsEmailPressed] = useState(false);
    // const [buttonTitle, setButtonTitle] = useState("USER LOGIN");

    const inputHandler = (type, value) => {
        if (type === "email") {
            setEmail(value);
            setIsEmailValid(validateEmail(value))
        } else if (type === "password") {
            setPassword(value);
        }
    };

    const handleLastRowButton = (type) => {
        if (type === 'create') {
            props.navigation.push('login', { signup: 'signup' }) //only user can create
        }
        // forget (user and admin)
    }

    const buttonHandler = () => {
        if (isSignup) {
            //here we are creating the user
        }
        else if (loginBy === 'user') {
            //here we are signing the user
        }
        else if (loginBy === 'admin') {
            //here we are signing the admin
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ backgroundColor: "transparent" }}
                contentContainerStyle={styles.screen}
            >
                <View style={styles.loginLabel}>
                    <Text style={styles.label}>{isSignup ? 'SIGN UP' : 'LOGIN'}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.textInput}>
                        <TextInput
                            label="Email"
                            // mode="outlined"
                            value={email}
                            // placeholder={'Enter your email'}
                            error={isEmailPressed ? (isEmailValid ? false : true) : false}
                            onEndEditing={setIsEmailPressed.bind(null, true)}
                            // left={() => <Text style={{ color: 'black' }}>hello</Text>}
                            onChangeText={inputHandler.bind(null, "email")}
                            left={<TextInput.Icon name="mail" size={25} color={"blue"} />}
                        />
                    </View>

                    <TextInput
                        label="Password"
                        // mode="outlined"
                        secureTextEntry={true}
                        // placeholder={'Enter your password'}
                        value={password}
                        onChangeText={inputHandler.bind(null, "password")}
                        left={
                            <TextInput.Icon name="lock-closed" size={25} color={"blue"} />
                        }
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        icon="person"
                        mode="contained"
                        style={styles.button}
                        onPress={buttonHandler}
                    >
                        {loginBy === 'user' ? 'USER LOGIN' : (loginBy === 'admin' ? 'ADMIN LOGIN': 'USER SIGNUP')}
                    </Button>
                </View>
                {!isSignup &&
                    <View style={styles.lastRow}>
                        {loginBy === 'user' ? (<TouchableOpacity
                            onPress={handleLastRowButton.bind(null, 'create')}
                        >
                            <Text style={styles.lastRowText}>Create Account</Text>
                        </TouchableOpacity>) : (
                                <View />
                            )}
                        <TouchableOpacity
                            onPress={handleLastRowButton.bind(null, 'forget')}
                        >
                            <Text style={styles.lastRowText}>Forget Password?</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
            <BackgroundImage
                source={require("../../assets/images/login-background.jpg")}
                headerHeight={headerHeight}
            />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 110,
    },

    loginLabel: {
        marginBottom: 40,
    },

    label: {
        fontFamily: "headings",
        fontSize: 25,
        color: "white",
    },

    inputContainer: {
        width: width - 35,
        marginBottom: 20,
    },

    buttonContainer: {
        backgroundColor: "blue",
        width: width - 35,
        borderRadius: 4,
    },

    lastRow: {
        marginTop: 5,
        width: width - 35,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    lastRowText: {
        color: "white",
    },

    textInput: {
        marginBottom: 1,
    },
});
