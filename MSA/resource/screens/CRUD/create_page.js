import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import requestCreate from '../../mapping/CRUD/create';

export default function Home({navigation}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [category, setCategory] = useState('');

  const notVide = () => {
    if(title != ""  &&  author != ""  &&  pageCount != ""  &&  isbn != ""  &&
      publicationDate != ""  &&  publisher != ""  &&  category != ""){
        return true;
    }else{
        return false;
    }
  };

  const handlePress = () => {
    if(notVide() == true){
    console.log(navigation, title, author, pageCount, isbn, publicationDate, publisher, category);
        requestCreate.requestCreate(navigation, title, author, pageCount, isbn, publicationDate, publisher, category);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Creating Book</Text>
      <TextInput style={styles.input}  placeholder="titre du livre"
        onChangeText={(text) => setTitle(text)} value={title} />

      <TextInput style={styles.input} placeholder="author du livre"
        onChangeText={(text) => setAuthor(text)} value={author} />

      <TextInput style={styles.input} placeholder="pageCount du livre"
        onChangeText={(text) => setPageCount(text)} value={pageCount} />

      <TextInput style={styles.input} placeholder="isbn du livre"
        onChangeText={(text) => setIsbn(text)} value={isbn} />

      <TextInput style={styles.input} placeholder="publicationDate du livre"
        onChangeText={(text) => setPublicationDate(text)} publicationDate={isbn} />

      <TextInput style={styles.input} placeholder="publisher du livre"
        onChangeText={(text) => setPublisher(text)} value={publisher} />

      <TextInput style={styles.input} placeholder="category du livre"
        onChangeText={(text) => setCategory(text)} value={category} />

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
