import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/Header';
import Package from '../../models/package';
import firebase from "firebase";
import Card from '../../components/Card';
import { Button } from 'react-native-paper';

const Birthday = props => {
    const [packages, setPackages] = useState([]);
    useEffect(() => {
        firebase.database().ref('events/birthday/packages').once('value', function (snapshot) {
            // new Package()
            const transformData = [];
            const response = snapshot.val();
            for (let id in response) {
                transformData.push(
                    new Package(id, response[id].name, response[id].price, response[id].theme, response[id].menu, response[id].venu)
                )
            }
            setPackages(transformData);
        });
    }, [])

    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} />
            <FlatList
                contentContainerStyle={{ padding: 20 }}
                data={packages}
                renderItem={(item) => {
                    return <Card style={{ padding: 4, marginVertical: 10 }}>
                        <View style={styles.cardHeader}>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'webfont', fontSize: 30 }}>{item.item.name}</Text>
                            </View>
                            <Button mode="text" onPress={() => console.log('Pressed')}>
                                Book Now
                                </Button>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: 'grey' }}></View>
                        <View style={styles.packageDetails}>
                            <View>
                                <Text><Text style={styles.labelStyle}>Price:</Text> {item.item.price}</Text>
                                <Text><Text style={styles.labelStyle}>Theme:</Text> {item.item.theme}</Text>
                                <Text><Text style={styles.labelStyle}>Venu:</Text> {item.item.venu}</Text>
                            </View>
                            <View style={styles.menuRowContainer}>
                                <View style={styles.menuLabelContainer}>
                                    <Text style={{ ...styles.labelStyle, textDecorationLine: 'underline' }}>Menu</Text>
                                </View>
                                <View style={styles.menuListContainer}>
                                    {item.item.menu.map((item) =>
                                        <Text>- {item}</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </Card>
                }}
            />
        </View>
    );
}

export default Birthday;

const styles = StyleSheet.create({
    screen: {
        paddingBottom: 80
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
    }
});
