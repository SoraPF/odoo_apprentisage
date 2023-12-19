import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const routeCRUD = async (value, {navigation}) => {
  try {
      switch(value){
        case("create"):
            navigation.navigate('create');
            break;
        case("edite"):
            navigation.navigate('create');
            break;
        case("readBook"):
            navigation.navigate('readBook');
            break;
        case("readBooks"):
            navigation.navigate('readBooks');
            break;
      }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la navigation :', error);

  }
};

export default { routeCRUD };
