import React from 'react';
import {Button} from 'react-native-paper';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { events } from '../../data/Data';

const EventDetail = props => {

    const { navigation, route } = props;

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: route.params?.name
        });
    }, [navigation]);

    const eventName = route.params?.name;
    const event = events.filter((event) => {
        if (event.title == eventName) {
            return true
        }
        return false;
    })[0];
    return (
        <ScrollView>
            <Image source={event.source} style={styles.image} resizeMode={'cover'} />
            <Text style={styles.description}>{event.desc}</Text>
            <View style={styles.buttonContainer}>
                {/* <Button title={'View Packages'} onPress={() => { console.log('packages') }} /> */}
            <Button icon="receipt" mode="contained" onPress={() => navigation.navigate(route.params?.name)}>
                View Packages
            </Button>
            </View>
        </ScrollView>
    );
}

export default EventDetail;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        fontFamily: 'joining'
    },
    buttonContainer: {
        marginHorizontal: 20,
    }
});
