import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screens/User/Home';
import EventDetail from '../screens/User/EventDetail';
import { LinearGradient } from 'expo-linear-gradient';
// import Packages from '../components/Header';
import IndividualService from '../screens/User/IndividualService';
import UserInvoices from '../screens/User/UserInvoices';
import BookedEvents from '../screens/User/BookedEvents';
// import UserRatings from '../screens/User/UserRatings';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Wedding from '../screens/User/Wedding';
import Birthday from '../screens/User/Birthday';
import Coorporate from '../screens/User/Coorporate';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import AdminWedding from '../screens/Admin/AdminWedding';
// import AdminInvoices from '../screens/Admin/AdminInvoices';
import AdminCorporate from '../screens/Admin/AdminCorporate';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import AdminBirthday from '../screens/Admin/AdminBirthday';
import VerifySlips from '../screens/Admin/VerifySlips';
import Ratings from '../screens/Admin/Ratings';

import firebase from 'firebase';
import UploadCv from '../screens/User/UploadCv';
import Cv from '../screens/Admin/Cv';
import Email from '../screens/Admin/Email';

const Stack = createStackNavigator();

function HomeNavigator() {
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
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="eventdetail" component={EventDetail} />
        </Stack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();

function PackagesBottomTab() {
    return (
        <Tab.Navigator activeColor='#eff542' shifting={true} >
            <Tab.Screen name="Wedding" component={Wedding} options={() => {
                return {
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name="heart" size={25} color={tabInfo.color} />
                    },
                    tabBarColor: '#000080',
                    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'headings' }}>Wedding</Text> : 'Wedding'
                }
            }} />
            <Tab.Screen name="Birthday" component={Birthday} options={() => {
                return {
                    tabBarIcon: (tabInfo) => {
                        return <FontAwesome5 name="birthday-cake" size={25} color={tabInfo.color} />
                    },
                    tabBarColor: '#808080',
                    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'headings' }}>Birthday</Text> : 'Birthday'
                }
            }} />
            <Tab.Screen name="Corporate" component={Coorporate} options={() => {
                return {
                    tabBarIcon: (tabInfo) => {
                        return <FontAwesome5 name="handshake" size={25} color={tabInfo.color} />
                    },
                    tabBarColor: '#184A45FF',
                    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'headings' }}>Coorporate</Text> : 'Coorporate'
                }
            }} />
        </Tab.Navigator>
    );
}

function CustomDrawerContent(props) {
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem activeTintColor={'blue'} inactiveTintColor={'white'} activeBackgroundColor={'blue'} style={{ borderTopWidth: 0.2, borderTopColor: 'yellow' }} label="Logout" onPress={() => {
                try {
                    firebase.auth().signOut();
                } catch (e) {
                }
                dispatch(logout())
            }} icon={({ focused, size }) => {
                return <Ionicons
                    name="log-out"
                    size={size}
                    color={focused ? '#7cc' : '#ccc'}
                />
            }} />
        </DrawerContentScrollView>
    );
}

const EmailTab = createMaterialBottomTabNavigator();

function EmailBottomTab() {
    return (
        <EmailTab.Navigator activeColor='#eff542' >
            <EmailTab.Screen name="Cv" component={Cv} options={() => {
                return {
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name="document-outline" size={25} color={tabInfo.color} />
                    },
                    tabBarColor: '#000080',
                    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'headings' }}>CV</Text> : 'CV'
                }
            }} />
            <EmailTab.Screen name="Email" component={Email} options={() => {
                return {
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name="mail-outline" size={25} color={tabInfo.color} />
                    },
                    tabBarColor: '#808080',
                    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'headings' }}>Email</Text> : 'Email'
                }
            }} />
        </EmailTab.Navigator>
    );
}

const Drawer = createDrawerNavigator();

function MainNavigator() {
    const isAdmin = useSelector(state =>
        state.auth.isAdmin
    );
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContentOptions={{ style: { backgroundColor: 'black', flex: 1 }, inactiveTintColor: 'white' }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            {
                isAdmin ? (
                    <>
                        <Drawer.Screen name="Wedding" component={AdminWedding} options={{
                            drawerIcon: ({ focused, size }) => (
                                <Ionicons
                                    name="heart"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Birthday" component={AdminBirthday} options={{
                            drawerIcon: ({ focused, size }) => (
                                <FontAwesome5
                                    name="birthday-cake"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Coorporate" component={AdminCorporate} options={{
                            drawerIcon: ({ focused, size }) => (
                                <FontAwesome5
                                    name="handshake"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Verify Slips" component={VerifySlips} options={{
                            drawerIcon: ({ focused, size }) => (
                                <FontAwesome5
                                    name="sticky-note"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Reviews" component={Ratings} options={{
                            drawerIcon: ({ focused, size }) => (
                                <Ionicons
                                    name="star"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="CV/Emails" component={EmailBottomTab} options={{
                            drawerIcon: ({ focused, size }) => (
                                <Ionicons
                                    name="mail"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                    </>
                ) : (
                    <>
                        <Drawer.Screen name="Home" component={HomeNavigator} options={{
                            drawerIcon: ({ focused, size }) => (
                                <Ionicons
                                    name="md-home"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Packages" component={PackagesBottomTab} options={{
                            drawerIcon: ({ focused, size }) => (
                                <Ionicons
                                    name="md-checkbox"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Individual Services" component={IndividualService} options={{
                            drawerIcon: ({ focused, size }) => (
                                <Ionicons
                                    name="md-git-network"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Invoices" component={UserInvoices} options={{
                            drawerIcon: ({ focused, size }) => (
                                <FontAwesome5
                                    name="file-invoice"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Booked Events" component={BookedEvents} options={{
                            drawerIcon: ({ focused, size }) => (
                                <Ionicons
                                    name="ios-book"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        <Drawer.Screen name="Upload CV" component={UploadCv} options={{
                            drawerIcon: ({ focused, size }) => (
                                <Ionicons
                                    name="cloud-upload"
                                    size={size}
                                    color={focused ? '#7cc' : '#ccc'}
                                />
                            ),
                        }} />
                        {/* <Drawer.Screen name="Your Ratings" component={UserRatings} /> */}
                    </>
                )
            }
        </Drawer.Navigator>
    );
}

export default MainNavigator;
