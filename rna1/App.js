import React, {Component} from "react";
import {root} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Login from "./resources/screens/Login";

const LoginStack = createNativeStackNavigator();

function App(){
    return (
        <NavigationContainer>
            <LoginStack.Navigator>
                <LoginStack.Screen name="login" component={Login}/>
            </LoginStack.Navigator>
        </NavigationContainer>
    )
}

export default App;