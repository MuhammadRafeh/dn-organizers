import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginWith from '../screens/LoginWith';
import Login from '../screens/Login';
import Home from '../screens/Home';
import EventDetail from '../screens/EventDetail';
import { LinearGradient } from 'expo-linear-gradient';
import Packages from '../screens/Packages';
import IndividualService from '../screens/IndividualService';
import UserInvoices from '../screens/UserInvoices';
import BookedEvents from '../screens/BookedEvents';
import UserRatings from '../screens/UserRatings';

const Stack = createStackNavigator();

function HomeNavigator() {
    const isLoggedIn = true;
    return (
        <Stack.Navigator screenOptions={{
            headerBackground: () => (
                <LinearGradient
                    colors={['#a13388', '#10356c']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            ),
            headerTintColor: 'white',
            headerTitleStyle: {
                alignSelf: 'center',
                fontFamily: 'headings',
                fontSize: 30,
                marginRight: 50
            },
        }}>
            {isLoggedIn ? (
                <>
                    <Stack.Screen name="home" component={Home} />
                    <Stack.Screen name="eventdetail" component={EventDetail} />
                </>
            ) : (
                    <>
                        <Stack.Screen name="loginwith" component={LoginWith} />
                        <Stack.Screen name="login" component={Login} />
                    </>
                )}
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

function MainNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContentOptions={{ style: { backgroundColor: 'black', flex: 1}, inactiveTintColor: 'white' }}
        >
            <Drawer.Screen name="Home" component={HomeNavigator} />
            <Drawer.Screen name="Packages" component={Packages} />
            <Drawer.Screen name="Individual Services" component={IndividualService} />
            <Drawer.Screen name="Invoices" component={UserInvoices} />
            <Drawer.Screen name="Booked Events" component={BookedEvents} />
            <Drawer.Screen name="Your Ratings" component={UserRatings} />
            {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        </Drawer.Navigator>
    );
}

export default MainNavigator;
