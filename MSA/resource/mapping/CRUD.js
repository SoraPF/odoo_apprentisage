
const routeCRUD = async (value, id, {navigation}) => {
  try {
      switch(value){
        case("create"):
            navigation.navigate('Crud',{screen:'create'});
            break;
        case("edite"):
            navigation.navigate('Crud',{screen:'edite',  id : id });
            break;
        case("readBook"):
            requestRead(id, navigation);
            break;
      }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la navigation :', error);

  }
};
const requestRead = async (isbn, navigation) => {
  const url ='http://localhost:8083/api/books/search/'+isbn;
  const met = 'POST';
  const head = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  };
  // Pass the username and navigation parameters to responseCurl
  responseCurl(url, met, head, isbn, { navigation });
}

function responseCurl(url, met, head, id, { navigation }) {
  // Using the fetch function to make a network request
  fetch(url, {
    method: met,     // HTTP method (e.g., 'GET', 'POST')
    headers: head,   // Request headers
  })
.then(response => response.json())
.then(data => {
  console.log('Réponse réussie:', data);
  navigation.navigate('Crud',{screen:'readBook', data : data});
})
.catch(error => {
  console.error('Erreur de réseau:', error);
});
}

export default { routeCRUD };
