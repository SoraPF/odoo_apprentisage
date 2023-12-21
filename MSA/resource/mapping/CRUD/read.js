import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const requestCreate = async (navigation,titre,author,
pageCount,isbn,publicationDate,publisher,category,) => {
  const url ='http://localhost:8080/api/books/list';
  const met = 'POST';
  const head = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  };

  // Pass the username and navigation parameters to responseCurl
  responseCurl(url, met, head, { navigation });
}

function responseCurl(url, met, head, { navigation }) {
  // Using the fetch function to make a network request
  fetch(url, {
    method: met,     // HTTP method (e.g., 'GET', 'POST')
    headers: head,   // Request headers
  })
.then(response => response.json())
.then(data => {
  console.log('Réponse réussie:', data);

})
.catch(error => {
  console.error('Erreur de réseau:', error);
});
}

export default { requestCreate};