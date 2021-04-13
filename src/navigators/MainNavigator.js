import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginWith from '../screens/LoginWith';
import Login from '../screens/Login';
import Home from '../screens/Home';

const Stack = createStackNavigator();

function HomeNavigator() {
    const isLoggedIn = true;
    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <>
                    <Stack.Screen name="home" component={Home} />
                    {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
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
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeNavigator} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
  );
}

export default MainNavigator;
