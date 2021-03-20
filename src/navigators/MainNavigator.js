import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LoginWith from '../screens/LoginWith';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();

function MainNavigator() {
    const isLoggedIn = false;
    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <>
                    <Stack.Screen name="home" component={Login} />
                    {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
                </>
            ) : (
                    <>
                        <Stack.Screen name="loginwith" component={LoginWith} />
                        <Stack.Screen name="login" component={Login} />
                        <Stack.Screen name="signup" component={Signup} />

                    </>
                )}
        </Stack.Navigator>
    );
}

export default MainNavigator;
