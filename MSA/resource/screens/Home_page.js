// Home_page.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { routeHome } from '../mapping/Home'; // Import correct

export default function Home({navigation}) {
  const handlePress = (value) => {
    routeHome(value, navigation);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bienvenue</Text>
      <Text>Text</Text>

      <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
        <Text style={styles.buttonText}>log in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePress(2)}>
        <Text style={styles.buttonText}>sign in</Text>
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
