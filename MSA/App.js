import React, {Component} from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';

import crud from "./resource/screens/CRUD_page";
import Login from "./resource/screens/Login_page";
import Home from "./resource/screens/Home_page";
import create from "./resource/screens/CRUD/create_page";
import edite from "./resource/screens/CRUD/edite_page";
import readBook from "./resource/screens/CRUD/readBook_page";
import Signin from "./resource/screens/Register_page";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CrudNavigator(){
    return (
        <Stack.Navigator>
          <Stack.Screen name="crud" component={crud}/>
          <Stack.Screen name="create" component={create} />
          <Stack.Screen name="edite" component={edite} />
          <Stack.Screen name="readBook" component={readBook} />
        </Stack.Navigator>
    );
}

function ConnexionNavigator(){
    return (
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={Login}/>
          <Drawer.Screen name="Signin" component={Signin}/>
        </Drawer.Navigator>
    );
}

export default function app() {
return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Crud" component={CrudNavigator} options={{ headerShown: false }}/>
          <Stack.Screen name="Connexion" component={ConnexionNavigator}  options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}