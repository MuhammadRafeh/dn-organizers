import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//Only user can create account

const Signup = props => {
    return (
        <View style={styles.screen}>
            <Text>
                Sign Up Page
            </Text>
        </View>
    );
}

export default Signup;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});
