import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Card from './Card';
import propTypes from 'prop-types';
import { List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Modal from 'react-native-modal';

// const Modals = (props) => {
//     return (
//         <View>
//             <Modal isVisible={isShow}>
//                 <View style={{ flex: 1 }}>
//                     <Text>I am the modal content!</Text>
//                 </View>
//             </Modal>
//         </View>
//     )
// }

const PackagesItem = props => {
    const [expanded, setExpanded] = useState(true);
    // const [isShowModal, setIsShowModal] = useState(false);

    const onDesignerPress = (setShowModal) => {
        // setIsShowModal(setShowModal);
    }

    const handlePress = () => setExpanded(!expanded);
    return (
        <Card style={styles.cardStyle}>
            {/* <Modals /> */}
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

                        <TouchableOpacity onPress={onDesignerPress.bind(null, true)}>
                            <Text style={{ color: 'blue' }}>{props.designerName}</Text>
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