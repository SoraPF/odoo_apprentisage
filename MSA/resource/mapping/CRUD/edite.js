import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const requestEdite = async (navigation,titre,author,
pageCount,isbn,publicationDate,publisher,category,) => {
  const body = JSON.stringify({
        title : title,
        author : author,
        pageCount : pageCount,
        isbn : isbn,
        publicationDate : publicationDate,
        publisher : publisher,
        category : category,
  });
  const url ='http://localhost:8083/api/books/edite';
  const met = 'POST';
  const head = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  };

  // Pass the username and navigation parameters to responseCurl
  responseCurl(url, met, head, body, { navigation });
}

function responseCurl(url, met, head, data, { navigation }) {
  // Using the fetch function to make a network request
  fetch(url, {
    method: met,     // HTTP method (e.g., 'GET', 'POST')
    headers: head,   // Request headers
    body: data,      // Request body data
  })
.then(response => response.json())
.then(data => {
  console.log('Réponse réussie:', data);
  navigation.navigate('crud');
})
.catch(error => {
  console.error('Erreur de réseau:', error);
});
}

export default { requestEdite};