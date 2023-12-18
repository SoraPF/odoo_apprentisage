import React, {Component} from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import crud from "./resource/screens/CRUD_page";
import Login from "./resource/screens/Login_page";
import Home from "./resource/screens/Home_page";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function app() {
return (
    <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="crud" component={crud}/>
          <Drawer.Screen name="Login" component={Login}/>
        </Drawer.Navigator>
    </NavigationContainer>
  );
}