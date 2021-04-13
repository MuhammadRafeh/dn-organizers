import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, Image, Text } from 'react-native';
// import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import propTypes from 'prop-types';
import Card from './Card';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const EventsItem = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.item}>
            <TouchableCmp useForeground={true} onPress={props.onSelect}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={props.image} style={styles.image} />
                    </View>
                    {/* <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price}</Text>
                    </View> */}
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.description}>{props.description}</Text>
                    </View>
                </View>
            </TouchableCmp>
        </Card>
    );
}

EventsItem.propTypes = {
    title: propTypes.string,
    image: propTypes.any,
    // price: propTypes.any,
    // imageUrl: propTypes.string,
    onSelect: propTypes.func,
    description: propTypes.string
}

export default EventsItem;

const styles = StyleSheet.create({
    item: {
        margin: 20,
        height: 300,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: "900",
        color: 'black',
        // fontFamily: 'open-sans-bold'
    },
    description: {
        marginTop: 3,
        fontFamily: 'joining'
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 10,
        height: '30%',
        alignItems: 'flex-start',
        paddingHorizontal: 20
    }
});


// -----------------------------------------------------------

// const Cards = props => {
//     return (
//         <View style={styles.cardContainer}>
//             <Card onPress={() => {console.log(23)}} elevation={1}>
//                 {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
//                 {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
//                 <Card.Cover source={props.source} />
//                 <Card.Content >
//                     <Title>{props.title}</Title>
//                     <Paragraph>{props.paragraph}</Paragraph>
//                 </Card.Content>
//                 {/* <Card.Actions>
//                     <Button>Cancel</Button>
//                     <Button>Ok</Button>
//                 </Card.Actions> */}
//             </Card>
//         </View>
//     );
// }

// Cards.propTypes = {
//     title: propTypes.string,
//     paragraph: propTypes.string,
//     source: propTypes.any
// }

// export default Cards;

// const styles = StyleSheet.create({
//     cardContainer: {
//         marginLeft: 10, 
//         marginRight: 10
//     }
// })

// -----------------------------------------------------------
