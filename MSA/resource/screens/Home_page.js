import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import routeHome from '../mapping/Home';

export default function Home({navigation}) {
  const handlePress = (truc) => {
    if (truc === 1) {
      routeHome.routeHome(truc,{navigation});
    } else {
      routeHome.routeHome(truc,{navigation});
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bienvenue</Text>

      <Text>Text</Text>

      <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
        <Text style={styles.buttonText}>Page de connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePress(2)}>
        <Text style={styles.buttonText}>Page de CRUD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
