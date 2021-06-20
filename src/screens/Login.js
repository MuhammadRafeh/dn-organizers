import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useHeaderHeight } from "@react-navigation/stack";
import BackgroundImage from "../components/BackgroundImage";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { authenticate } from "../redux/actions";

const { width, height } = Dimensions.get("window");

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Login = (props) => {
    let headerHeight = useHeaderHeight();
    const loginBy = props.route.params?.loginBy; //value can be user or admin
    const isSignup = props.route.params?.signup === 'signup';

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailPressed, setIsEmailPressed] = useState(false);
    // const [buttonTitle, setButtonTitle] = useState("USER LOGIN");

    const inputHandler = (type, value) => {
        if (type === "email") {
            setEmail(value);
            setIsEmailValid(validateEmail(value))
        } else if (type === "password") {
            setPassword(value);
        } else if (type === "confirmPassword") {
            setConfirmPassword(value)
        }
    };

    const forgotPassword = () => {
        if (!isEmailValid) {
            Alert.alert('Enter valid email first!', 'Provide your email first.', [{ text: 'Ok', style: 'destructive' }])
            return;
        }
        firebase.auth().sendPasswordResetEmail(email)
            .then(function (user) {
                // alert('Please check your email...')
                Alert.alert('Check your email!', 'Check email in order to set new password', [{ text: 'Ok', style: 'destructive' }])
                setEmail('')
            }).catch(function (e) {
                // console.log(e)
                Alert.alert('Something went wrong!', e.message, [{ text: 'Ok', style: 'destructive' }])
            })
    }

    const handleLastRowButton = (type) => {
        if (type === 'create') {
            props.navigation.push('login', { signup: 'signup' }) //only user can create
            return;
        }
        if (type === 'forget') {
            forgotPassword();
            return;
        }
        // forget (user and admin)
    }

    const buttonHandler = () => {
        if (isSignup) {
            //here we are creating the user
            if (password === confirmPassword && password.length >= 6) {
                firebase.auth().createUserWithEmailAndPassword(email, password).then((object) => {
                    // dispatch(authenticate(object.user.uid, email, false, false));
                    object.user.sendEmailVerification();
                    // console.log(object.user.sendEmailVerification())
                    firebase.auth().signOut();
                    Alert.alert('Check your email!', 'Verify your email in order to login.', [{text: 'Ok', style: 'destructive'}])
                    props.navigation.goBack();
                }).catch(err => {
                    Alert.alert('Something went wrong', err.message, [{ text: 'Ok' }])
                })
                // firebase.auth().
            } else {
                Alert.alert('Provided Info Is Not Valid!', 'Passwords not match with each other / Password must be at least 6 characters.', [{ text: 'Ok', style: 'destructive' }])
            }
        }
        else if (loginBy === 'user' && isEmailValid && password >= 6) {
            //here we are signing the user
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((object) => {
                    // console.log(object.user.uid)
                    if (!object.user.emailVerified){
                        Alert.alert('Please verify your email!', 'Your email is not verified yet.', [{text: 'OK', style: 'destructive'}])
                        firebase.auth().signOut();
                        return
                    }
                    dispatch(authenticate(object.user.uid, email.toLowerCase(), false, false))
                })
                .catch(error => Alert.alert('Something went wrong', error.message, [{ text: 'OK', style: 'destructive' }]));
        }
        else if (loginBy === 'admin') {
            //here we are signing the admin
            // firebase.database().ref('admin/').once('value', function (snapshot) {
            //     const admin = snapshot.val();
            //     if (admin.email == email && admin.password == password){
            //         dispatch(authenticate())
            //     } 
            // });
            if (email.toLowerCase() == 'admin@gmail.com' && password == '123456') {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then((object) => {
                        dispatch(authenticate(object.user.uid, email, true, false))
                    })
                    .catch(error => Alert.alert('Something went wrong', error.message, [{ text: 'OK' }]));
            } else {
                Alert.alert('Wrong Credentials', 'Invalid email/password', [{ text: 'Ok', style: 'destructive' }])
            }
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
                            placeholder={'Enter your email'}
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
                        placeholder={'Enter your password'}
                        value={password}
                        onChangeText={inputHandler.bind(null, "password")}
                        left={
                            <TextInput.Icon name="lock-closed" size={25} color={"blue"} />
                        }
                    />
                    {isSignup && (<View style={styles.confirmPassword}>
                        <TextInput
                            label="Password"
                            // mode="outlined"
                            secureTextEntry={true}
                            placeholder={'Confirm your password'}
                            value={confirmPassword}
                            onChangeText={inputHandler.bind(null, "confirmPassword")}
                            left={
                                <TextInput.Icon name="lock-closed" size={25} color={"blue"} />
                            }
                        />
                    </View>)
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        icon="person"
                        mode="contained"
                        style={styles.button}
                        onPress={buttonHandler}
                    >
                        {loginBy === 'user' ? 'USER LOGIN' : (loginBy === 'admin' ? 'ADMIN LOGIN' : 'USER SIGNUP')}
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
        marginBottom: 2,
    },

    confirmPassword: {
        marginTop: 2
    }
});
