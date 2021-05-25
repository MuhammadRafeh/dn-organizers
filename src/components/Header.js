// // User Side Screen
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Packages = props => {
//     return (
//         <View style={styles.screen}>
//             <Text>This is Packages Screen</Text>
//         </View>
//     );
// }

// export default Packages;

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// });
import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = props => {

    const _goBack = () => props.navigation.toggleDrawer();;

    //   const _handleSearch = () => console.log('Searching');

    //   const _handleMore = () => console.log('Shown more');

    return (
        <Appbar.Header>
            <Appbar.Action
                icon="menu"
                onPress={_goBack}
            />
            {props.invoices ? <Appbar.Content title="Invoices" subtitle="Packages" /> : props.custom ? <Appbar.Content title="Custom" subtitle="Events" /> : (
                props.bookedEvent ? <Appbar.Content title="Booked" subtitle="Events" /> : props.bookedEvents ? <Appbar.Content title="Booked" subtitle="Events" />: <Appbar.Content title="Packages" subtitle="Events" />
            )}
            {/* <Appbar.Action icon="save" onPress={_handleMore} /> */}
            {/* {props.custom && <Appbar.Content title="Custom" subtitle="Events" />} */}
            {/* <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
        </Appbar.Header>
    );
};

export default Header;
