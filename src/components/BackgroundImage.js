import React from 'react';
import { View, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import propTypes from 'prop-types';

const BackgroundImage = props => {
    if (!props.headerHeight) {
        return (
            <ImageBackground
                source={props.source}
                style={[
                    styles.backgroundImage,
                    { height: Dimensions.get("window").height },
                    { zIndex: -1 },
                ]}
            />
        );
    }
    return (
        <ImageBackground
            source={props.source}
            style={[
                styles.backgroundImage,
                { height: Dimensions.get("window").height + props.headerHeight },
                { zIndex: -1 },
            ]}
        />
    );
}

BackgroundImage.propTypes = {
    headerHeight: propTypes.any,
    source: propTypes.any
}

export default BackgroundImage;

const styles = StyleSheet.create({
    backgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get("window").width, //for full screen
        // height: Dimensions.get("window").height  //for full screen
    },
});
