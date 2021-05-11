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
        <View>
            <Header navigation={props.navigation} />
            <FlatList
                contentContainerStyle={{ padding: 20 }}
                data={packages}
                renderItem={(item) => {
                    return <View style={{ marginVertical: 10 }}>
                        <Card style={{ padding: 4 }}>
                            <View style={styles.cardHeader}>
                                <View style={{flex: 1}}/>
                                <View style={{ flex: 1}}>
                                    <Text style={{ textAlign: 'center', fontFamily: 'webfont', fontSize: 30 }}>{item.item.name}</Text>
                                </View>
                                <Button mode="text" onPress={() => console.log('Pressed')}>
                                    Book Now
                                </Button>
                            </View>
                            <View style={{ width: '100%', height: 1, backgroundColor: 'grey' }}></View>
                            <View style={styles.packageDetails}>
                                <View>
                                    <Text>Price: {item.item.price}</Text>
                                    <Text>Theme: {item.item.theme}</Text>
                                </View>
                                <View>
                                    <Text>Venu: {item.item.venu}</Text>
                                    <Text>Menu: {item.item.menu}</Text>
                                </View>
                            </View>
                        </Card>

                    </View>
                }}
            />
        </View>
    );
}

export default Birthday;

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    packageDetails: {
        padding: 6
    }
});
