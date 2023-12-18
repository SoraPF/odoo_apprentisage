import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';


function route_CRUD_page() {
      console.log('route CRUD');
}

function route_Login_page() {
      console.log('route Connexion');
}

const routeHome = async (value) => {

  try {
    if (value === 1) {
      route_Login_page();
    } else {
      route_CRUD_page();
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la navigation :', error);

  }
};

export default { routeHome };
