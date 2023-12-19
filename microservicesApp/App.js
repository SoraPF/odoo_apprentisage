import React, {Component} from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';

import crud from "./resource/screens/CRUD_page";
import Login from "./resource/screens/Login_page";
import Home from "./resource/screens/Home_page";
import create from "./resource/screens/CRUD/create_page";
import edite from "./resource/screens/CRUD/edite_page";
import readBook from "./resource/screens/CRUD/readBook_page";
import readBooks from "./resource/screens/CRUD/readBooks_page";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Crud(){
    return (
        <Stack.Navigator>
          <Drawer.Screen name="crud" component={crud}/>
          <Stack.Screen name="create" component={create} />
          <Stack.Screen name="edite" component={edite} />
          <Stack.Screen name="readBook" component={readBook} />
          <Stack.Screen name="readBooks" component={readBooks} />
        </Stack.Navigator>
    );
}

export default function app() {
return (
    <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="crud" component={Crud}/>
          <Drawer.Screen name="Login" component={Login}/>
        </Drawer.Navigator>
    </NavigationContainer>
  );
}