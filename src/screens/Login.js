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

const Login = (props) => {
    let headerHeight = useHeaderHeight();
    useEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
            // headerTintColor: 'white'
        });
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonTitle, setButtonTitle] = useState("USER LOGIN");

    const inputHandler = (type, value) => {
        if (type === "email") {
            setEmail(value);
        } else if (type === "password") {
            setPassword(value);
        }
    };

    const screenTouchHandler = () => {
        Keyboard.dismiss();
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ backgroundColor: "transparent" }}
                contentContainerStyle={styles.screen}
            >
                <View style={styles.loginLabel}>
                    <Text style={styles.label}>LOGIN</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.textInput}>
                        <TextInput
                            label="Email"
                            // mode="outlined"
                            value={email}
                            // placeholder={'Enter your email'}

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
                        onPress={() => console.log("Pressed")}
                    >
                        {buttonTitle}
                    </Button>
                </View>
                <View style={styles.lastRow}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Create Account Pressed");
                        }}
                    >
                        <Text style={styles.lastRowText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Create Account Pressed");
                        }}
                    >
                        <Text style={styles.lastRowText}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
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
