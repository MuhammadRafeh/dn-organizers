import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
    return (
        <View style={styles.screen}>
            <Text>
               This is admin's home 
            </Text>
        </View>
        
    );
}

export default Home;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
