import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Card from './Card';
import propTypes from 'prop-types';

const PackagesItem = props => {
    return (
        <Card style={styles.cardStyle}>
            <View style={styles.cardHeader}>
                <View style={styles.flex1} />
                <View style={styles.flex1}>
                    <Text style={styles.packageName}>{props.name}</Text>
                </View>
                <Button mode="text" onPress={() => console.log('Pressed')}>
                    Book Now
                </Button>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.packageDetails}>
                <View>
                    <Text><Text style={styles.labelStyle}>Price:</Text> {props.price}</Text>
                    <Text><Text style={styles.labelStyle}>Theme:</Text> {props.theme}</Text>
                    <Text><Text style={styles.labelStyle}>Venu:</Text> {props.venu}</Text>
                </View>
                <View style={styles.menuRowContainer}>
                    <View style={styles.menuLabelContainer}>
                        <Text style={{ ...styles.labelStyle, textDecorationLine: 'underline' }}>Menu</Text>
                    </View>
                    <View style={styles.menuListContainer}>
                        {props.menu.map((item, key) =>
                            <Text key={key}><Text style={styles.menuListDecorator}>-</Text> {item}</Text>
                        )}
                    </View>
                </View>
            </View>
        </Card>
    );
}

PackagesItem.propTypes = {
    name: propTypes.string,
    price: propTypes.any,
    menu: propTypes.array,
    venu: propTypes.string,
    theme: propTypes.string
}

export default PackagesItem;

const styles = StyleSheet.create({
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'grey'
    },
    packageName: {
        textAlign: 'center',
        fontFamily: 'webfont',
        fontSize: 30
    },
    flex1: {
        flex: 1
    },
    cardStyle: {
        padding: 4,
        marginVertical: 10
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    packageDetails: {
        padding: 6
    },
    labelStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    menuLabelContainer: {
        flex: 1
    },
    menuListContainer: {
        flex: 1
    },
    menuRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    menuListDecorator: {
        fontWeight: 'bold'
    }
});