import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Card from './Card';
import propTypes from 'prop-types';
import { List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Avatar } from 'react-native-paper';
import { designers } from '../data/Data';
import { Ionicons } from '@expo/vector-icons';


const Modals = props => { //designerName, toggleModal, isShow
    const rating = [1, 2, 3, 4, 5];

    const designerDetail = designers.filter(item => item.name == props.designerName)[0];
    console.log(designerDetail)
    if (props.card) {
        return (
            <View>
                <Modal isVisible={props.isShow}>
                    <ScrollView
                        contentContainerStyle={{ justifyContent: 'center' }}
                    >
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 2 }}>
                            
                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'headings', fontSize: 30 }}>Cards</Text>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {designerDetail.gallery.map(img => (
                                    <Image style={{ width: '100%', height: 150, margin: 10 }} resizeMode={'cover'} source={img} />
                                ))}
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Button mode="text" onPress={props.toggleModal}>
                                    Close
                            </Button>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        )
    }
    return (
        <View>
            <Modal isVisible={props.isShow}>
                <ScrollView
                    contentContainerStyle={{ justifyContent: 'center' }}
                >
                    <View style={{ backgroundColor: 'white', padding: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Avatar.Image size={60} source={designerDetail.pic} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ gallerybackgroundColor: 'white', fontFamily: 'joining' }}>{designerDetail.name}</Text>
                        </View>
                        <View style={{ marginTop: 0, padding: 0 }}>
                            <Text style={{ textAlign: 'center', marginBottom: 0 }}>
                                {rating.map((number, index) => {
                                    if (index < designerDetail.rating) {
                                        return <Ionicons key={index} name={'star'} size={23} color={'red'} />
                                    } return <Ionicons key={index} name={'star-outline'} size={23} color={'red'} />
                                })}
                            </Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ textAlign: 'center' }}>
                                {designerDetail.desc}
                            </Text>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'headings', fontSize: 30 }}>Gallery</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {designerDetail.gallery.map(img => (
                                <Image style={{ width: '100%', height: 150, margin: 10 }} resizeMode={'cover'} source={img} />
                            ))}
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Button mode="text" onPress={props.toggleModal}>
                                Close
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

const PackagesItem = props => {
    const [expanded, setExpanded] = useState(true);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowCard, setIsShowCard] = useState(false);

    const onDesignerPress = (setShowModal, cardShowState) => {
        setIsShowModal(setShowModal);
        setIsShowCard(cardShowState);
    }

    const handlePress = () => setExpanded(!expanded);
    return (
        <Card style={styles.cardStyle}>
            <Modals isShow={isShowModal} card={isShowCard} toggleModal={setIsShowModal.bind(null, !isShowModal)} designerName={props.designerName} />
            <View style={styles.cardHeader}>
                <View style={styles.flex1} />
                <View style={styles.flex1}>
                    <Text style={styles.packageName}>{props.name}</Text>
                </View>
                <Button mode="text" onPress={props.handleBookPress}>
                    Book Now
                </Button>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.packageDetails}>
                <View>
                    <Text><Text style={styles.labelStyle}>Price:</Text> {props.price}</Text>
                    <Text><Text style={styles.labelStyle}>Theme:</Text> {props.theme}</Text>
                    <Text><Text style={styles.labelStyle}>Venu:</Text> {props.venu}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.labelStyle}>Designer: </Text>
                        </View>

                        <TouchableOpacity onPress={onDesignerPress.bind(null, true, false)}>
                            <Text style={{ color: 'blue' }}>{props.designerName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.labelStyle}>Card: </Text>
                        </View>

                        <TouchableOpacity onPress={onDesignerPress.bind(null, true, true)}>
                            <Text style={{ color: 'blue' }}>View Details</Text>
                        </TouchableOpacity>
                    </View>
                    <Text><Text style={styles.labelStyle}>Date:</Text> {props.occuredDate}</Text>
                    <Text><Text style={styles.labelStyle}>No of People:</Text> {props.noOfPeople}</Text>
                    {/* <Text><Text style={styles.labelStyle}>Venu:</Text> {props.venu}</Text> */}
                </View>
                <List.Section>
                    <List.Accordion
                        title="Menu"
                        // left={props => <List.Icon {...props} icon="folder" />}
                        expanded={expanded}
                        onPress={handlePress}>
                        {/* <List.Item title="First item" /> */}
                        <View style={{ marginLeft: 5 }}>
                            {props.menu.map((item, key) => {
                                if (item.name) {
                                    return (
                                        <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 15 }}>
                                            <Text><Text style={styles.menuListDecorator}>-</Text>{item.name}</Text>
                                            <Text>{item.price}</Text>
                                        </View>
                                    )
                                } return (
                                    <Text><Text style={styles.menuListDecorator}>-</Text>{item}</Text>
                                )
                            })}
                        </View>
                    </List.Accordion>
                </List.Section>
            </View>
        </Card>
    );
}

PackagesItem.propTypes = {
    // id: propTypes.string,
    name: propTypes.string,
    price: propTypes.any,
    menu: propTypes.array,
    venu: propTypes.string,
    theme: propTypes.string,
    handleBookPress: propTypes.func
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
        justifyContent: 'flex-end',
        alignItems: 'center'
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