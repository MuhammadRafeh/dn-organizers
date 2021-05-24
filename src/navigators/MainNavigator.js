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
import UserRatings from '../screens/User/UserRatings';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Wedding from '../screens/User/Wedding';
import Birthday from '../screens/User/Birthday';
import Coorporate from '../screens/User/Coorporate';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import AdminWedding from '../screens/Admin/AdminWedding';
import AdminInvoices from '../screens/Admin/AdminInvoices';
import AdminCorporate from '../screens/Admin/AdminCorporate';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import AdminBirthday from '../screens/Admin/AdminBirthday';
import VerifySlips from '../screens/Admin/VerifySlips';
import Ratings from '../screens/Admin/Ratings';

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
            <Tab.Screen name="Coorporate" component={Coorporate} options={() => {
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
            <DrawerItem activeTintColor={'blue'} inactiveTintColor={'white'} activeBackgroundColor={'blue'} style={{borderTopWidth: 0.2, borderTopColor: 'yellow'}} label="Logout" onPress={() => dispatch(logout())} />
        </DrawerContentScrollView>
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
                        <Drawer.Screen name="Wedding" component={AdminWedding} />
                        <Drawer.Screen name="Birthday" component={AdminBirthday} />
                        <Drawer.Screen name="Coorporate" component={AdminCorporate} />
                        <Drawer.Screen name="Verify Slips" component={VerifySlips} />
                        <Drawer.Screen name="Reviews" component={Ratings} />
                    </>
                ) : (
                    <>
                        <Drawer.Screen name="Home" component={HomeNavigator} />
                        <Drawer.Screen name="Packages" component={PackagesBottomTab} />
                        <Drawer.Screen name="Individual Services" component={IndividualService} />
                        <Drawer.Screen name="Invoices" component={UserInvoices} />
                        <Drawer.Screen name="Booked Events" component={BookedEvents} />
                        {/* <Drawer.Screen name="Your Ratings" component={UserRatings} /> */}
                    </>
                )
            }
        </Drawer.Navigator>
    );
}

export default MainNavigator;
