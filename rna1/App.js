import React, {Component} from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator, navigation} from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from "./resources/screens/Login";
import Home from "./resources/screens/Home";
import Devis from "./resources/screens/Devis";
import ListContact from "./resources/screens/ListContact";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ListContact" component={ListContact}/>
      <Drawer.Screen name="Devis" component={Devis}/>
    </Drawer.Navigator>
  );
}

function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Root" component={Root}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default App;