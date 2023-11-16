import React from 'react';
import { Button, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const handleButtonPress = () => {
    // Fonction à exécuter lorsqu'on appuie sur le bouton
    console.log('Bouton appuyé !, mais je veux faire afficher SignUpScreen');
     navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.centeredButton}>
        <Button title="Appuyer sur moi" onPress={handleButtonPress} />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredButton: {
    marginTop: 20, // Ajuste l'espacement par rapport aux autres éléments
  },
});

export default App;
