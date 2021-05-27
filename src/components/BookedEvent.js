import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import Card from './Card';

const BookedEvent = props => {
    const { item } = props;
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    return (
        <Card style={{ margin: 10, overflow: 'hidden' }}>
            <View style={{ height: 80, backgroundColor: 'green', justifyContent: 'center', overflow: 'hidden' }}>
                <Text style={{ textAlign: 'center', fontFamily: 'headings', color: 'white', fontSize: 20 }}>Event Booked Successfully!</Text>
                <View style={{ height: 20, width: 110, position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 30, backgroundColor: 'blue', transform: [{ rotate: '-55deg' }] }}>
                    <View style={{ marginTop: 4 }}>
                        <Text style={{ color: 'white', fontFamily: 'joining', textAlign: 'center', fontSize: 20 }}>{item.isPackage ? 'Package' : 'Custom'}</Text>
                    </View>
                </View>
            </View>
            <View style={{ padding: 10 }}>
                <View>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>Event Placed On</Text>
                    <Text style={{ textAlign: 'center', fontFamily: 'descent', fontSize: 20 }}>{new Date(item.occuredDate).toUTCString()}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>Venu</Text>
                    <Text style={{ textAlign: 'center', fontFamily: 'descent', fontSize: 20, color: 'brown' }}>{item.venu}</Text>
                </View>

                <View>
                    {/* Menu */}
                    <List.Section>
                        <List.Accordion
                            title="Menu"
                            // left={props => <List.Icon {...props} icon="folder" />}
                            expanded={expanded}
                            onPress={handlePress}>
                            {/* <List.Item title="First item" /> */}
                            <View style={{ marginLeft: 5 }}>
                                {item.menu.map((item, key) => {
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

                <View style={{ marginTop: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>No of People</Text>
                    <Text style={{ textAlign: 'center', fontFamily: 'descent', fontSize: 40, color: 'black' }}>{item.noOfPeople}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'grey' }}>Designer</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'right', color: 'black', fontFamily: 'joining' }}>{item.designerName}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'grey' }}>Theme</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'right', color: 'black', fontFamily: 'joining' }}>{item.eventName}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'grey' }}>Price</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'right', color: 'black', fontFamily: 'joining' }}>{item.price}</Text>
                    </View>
                </View>

                {
                    item.isPackage && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: 'grey' }}>Package</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'right', color: 'black', fontFamily: 'joining' }}>{item.serPackName}</Text>
                            </View>
                        </View>
                    )
                }

                { //here checking if event has passed/done taking review then;
                    new Date(item.occuredDate).getTime() < new Date().getTime() && (
                        <View style={{backgroundColor: 'grey', marginTop: 10, padding: 10, borderRadius: 10}}>
                            <Text style={{textAlign: 'center', color: 'white'}}>Your Event has been Passed!</Text>
                        </View>
                    )
                }

{/* date.getTime() < new Date().getTime() //it's mean the event has been passed */}
            </View>
        </Card>
    );
}

export default BookedEvent;

const styles = StyleSheet.create({
    menuListDecorator: {
        fontWeight: 'bold'
    }
});
