// User Side Screen
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import firebase from 'firebase';
import { setPendingInvoices } from '../../redux/actions';
import PendingInvoices from '../../models/pendingInvoices';
import Card from '../../components/Card';

// import ViewShot from "react-native-view-shot";

const UserInvoices = props => {
    const [pendingInvoices, email] = useSelector(state => [state.invoices.pendingInvoices, state.auth.email]);
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [imageUri, setImageUri] = useState('');

    const screenShot = useRef(null);

    const pullData = () => {
        setIsRefreshing(true);
        firebase.database().ref('pendingInvoices').once('value', function (snapshot) {
            console.log(snapshot.val())
            dispatch(setPendingInvoices(snapshot.val(), email));
            setIsRefreshing(false);
        });
    }
    useEffect(() => {
        pullData();
    }, [])
    // console.log(pendingInvoices)
    // const onCapture = () => {
    //     screenShot.current.capture().then(uri => {
    //         console.log("do something with ", uri);
    //         setImageUri(uri);
    //     });
    // }
    return (
        <View style={styles.screen}>
            <Header navigation={props.navigation} invoices />
            <FlatList
                onRefresh={pullData}
                refreshing={isRefreshing}
                data={pendingInvoices} //[new PendingInvoices(), .....]
                renderItem={(item) => {
                    return (
                        <Card style={{ marginHorizontal: 10, marginBottom: 8, marginTop: 8, overflow: 'hidden' }}>
                            <View style={styles.header}>
                                {
                                    item.item.isPackage ? (
                                        <Text>
                                            Package
                                        </Text>) : (
                                        <Text>
                                            Custom
                                        </Text>
                                    )
                                }
                                <Text>

                                </Text>
                                <Text>
                                    {item.item.serPackName}
                                </Text>
                            </View>
                        </Card>
                    )
                }}
            />
            {/* <ViewShot style={{backgroundColor: 'white'}} ref={screenShot} options={{ format: "jpg", quality: 0.9 }}>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
                <Text>...Something to rasterize...</Text>
            </ViewShot> */}
            {/* <h1>asd</h1> */}
            {/* <Button title={'preess'} onPress={onCapture} /> */}
            {/* <Image source={{uri: imageUri}} style={{width: '100%', height: 400}} resizeMode={'contain'}/> */}
        </View>
    );
}

export default UserInvoices;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    header: {
        backgroundColor: '#add8e6',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
