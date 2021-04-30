import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventDetail = props => {

    const { navigation } = props;

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: props.route.params?.name
        });
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <Text>
                Text here
            </Text>
        </View>
    );
}

export default EventDetail;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
