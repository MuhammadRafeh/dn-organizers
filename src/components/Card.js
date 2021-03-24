import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import propTypes from 'prop-types';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Cards = props => {
    return (
        <View style={styles.cardContainer}>
            <Card>
                {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
                {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                <Card.Cover source={props.source} />
                <Card.Content>
                    <Title>{props.title}</Title>
                    <Paragraph>{props.paragraph}</Paragraph>
                </Card.Content>
                {/* <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions> */}
            </Card>
        </View>
    );
}

Cards.propTypes = {
    title: propTypes.string,
    paragraph: propTypes.string,
    source: propTypes.any
}

export default Cards;

const styles = StyleSheet.create({
    cardContainer: {
        marginLeft: 10, 
        marginRight: 10
    }
})
