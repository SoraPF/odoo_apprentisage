import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

function route_CRUD_page(navigation) {
      console.log('route CRUD');
      navigation.navigate('crud');
}

function route_Login_page(navigation) {
      console.log('route Connexion');
      navigation.navigate('Login');
}

const routeHome = async (value, {navigation}) => {
  try {
    if (value === 1) {
      route_Login_page(navigation);
    } else {
      route_CRUD_page(navigation);
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la navigation :', error);

  }
};

export default { routeHome };
