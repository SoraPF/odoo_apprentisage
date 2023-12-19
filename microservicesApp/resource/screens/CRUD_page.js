import * as React from 'react';
import { View, Text, Button, TouchableOpacity,StyleSheet } from 'react-native';
import routeCRUD from '../mapping/CRUD';

export default function Home({route, navigation}) {
    const handlePress = (truc) => {
          routeCRUD.routeCRUD(truc,{navigation});
    };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={styles.button} onPress={() => handlePress("create")}>
        <Text style={styles.buttonText}>ajouter livre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress("readBook")}>
        <Text style={styles.buttonText}>recherche livre par id</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress("readBooks")}>
        <Text style={styles.buttonText}>affiche liste livre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress("edite")}>
        <Text style={styles.buttonText}>modifier livre</Text>
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