import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Card from './Card';
import propTypes from 'prop-types';
import { List } from 'react-native-paper';

const AdminPackageItems = props => {
    const [expanded, setExpanded] = React.useState(true);
    let menu = [];
    if (props.menu) {
        menu = [...props.menu]
    }
    const handlePress = () => setExpanded(!expanded);
    return (
        <Card style={styles.cardStyle}>
            <View style={styles.cardHeader}>
                <View style={styles.flex1} />
                <View style={{flex: 2}}>
                    <Text style={styles.packageName}>{props.name}</Text>
                </View>
                <View style={styles.flex1}>
                    <Button mode="text" onPress={props.handleBookPress}>
                        Delete
                    </Button>
                </View>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.packageDetails}>
                <View>
                    <Text><Text style={styles.labelStyle}>Price:</Text> {props.price}</Text>
                    <Text><Text style={styles.labelStyle}>Theme:</Text> {props.theme}</Text>
                    <Text><Text style={styles.labelStyle}>Venu:</Text> {props.venu}</Text>
                    <Text><Text style={styles.labelStyle}>No of people:</Text> {props.noOfPeople}</Text>
                    <Text><Text style={styles.labelStyle}>Date:</Text> {props.occuredDate}</Text>
                </View>
                <List.Section>
                    <List.Accordion
                        title="Menu"
                        // left={props => <List.Icon {...props} icon="folder" />}
                        expanded={expanded}
                        onPress={handlePress}>
                        {/* <List.Item title="First item" /> */}
                        <View style={{ marginLeft: 5 }}>
                            {menu.map((item, key) => {
                                if (item.name) {
                                    return (
                                        <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 15 }}>
                                            <Text><Text style={styles.menuListDecorator}>- </Text>{item.name}</Text>
                                            <Text>{item.price}</Text>
                                        </View>
                                    )
                                } return (
                                    <Text key={key}><Text style={styles.menuListDecorator}>-</Text>{item}</Text>
                                )
                            })}
                        </View>
                    </List.Accordion>
                </List.Section>
            </View>
        </Card>
    );
}

AdminPackageItems.propTypes = {
    // id: propTypes.string,
    name: propTypes.string,
    price: propTypes.any,
    menu: propTypes.array,
    venu: propTypes.string,
    theme: propTypes.string,
    handleBookPress: propTypes.func
}

export default AdminPackageItems;

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
        marginVertical: 10,
        marginHorizontal: 10
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