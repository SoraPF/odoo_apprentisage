import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import requestRegister from '../mapping/Register';

export default function Home({navigation}) {
  const [Nom, setNom] = useState('');
  const [Prenom, setPrenom] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [VerifPassword, setVerifPassword] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Age, setAge] = useState('');

  const notVide = () => {
    if(Nom != ""  &&  Prenom != ""  &&  Email != ""  &&  Password != ""  &&
      VerifPassword != ""  &&  Mobile != ""  &&  Age != "" && Password == VerifPassword){
        return true;
    }else{
        return false;
    }
  };

  const handlePress = () => {
    if(notVide() == true){
    console.log(navigation, Nom, Prenom, Email, Password, VerifPassword, Mobile, Age);
        requestRegister.requestRegister(navigation, Nom, Prenom, Email, Password, Mobile, Age);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Creating Book</Text>
      <TextInput style={styles.input}  placeholder="Enter Nom"
        onChangeText={(text) => setNom(text)} value={Nom} />

      <TextInput style={styles.input} placeholder="Enter Prenom"
        onChangeText={(text) => setPrenom(text)} value={Prenom} />

      <TextInput style={styles.input} placeholder="Enter Email"
        onChangeText={(text) => setEmail(text)} value={Email} />

      <TextInput style={styles.input} placeholder="Enter Password"
        onChangeText={(text) => setPassword(text)} value={Password} />

      <TextInput style={styles.input} placeholder="Enter Verrifed password"
        onChangeText={(text) => setVerifPassword(text)} value={VerifPassword} />

      <TextInput style={styles.input} placeholder="Enter Mobile"
        onChangeText={(text) => setMobile(text)} value={Mobile} />

      <TextInput style={styles.input} placeholder="Enter Age"
        onChangeText={(text) => setAge(text)} value={Age} />

      <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
        <Text style={styles.buttonText}>Create book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
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
