import * as React from 'react';
import { View, Text, Button, TouchableOpacity,StyleSheet } from 'react-native';
import curl from '../listeContactCurl';

export default function Home({route, navigation}) {
   const listingContact = () => {
     console.log('Bouton appuyé!');
     curl.requestCurl(navigation);
   };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bienvenue {JSON.stringify(route.params.donner.name)}</Text>

      <Text>is admin = {JSON.stringify(route.params.donner.is_admin)}</Text>

      <TouchableOpacity style={styles.button} onPress={listingContact}>
        <Text style={styles.buttonText}>button</Text>
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