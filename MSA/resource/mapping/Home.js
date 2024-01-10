// Home_mapping.js
import { useNavigation } from '@react-navigation/native';

function route_Login_page(navigation) {
  console.log('route signin');
  navigation.navigate('Connexion',{screen:'Login'});
}

function route_Signin_page(navigation) {
  console.log('route Connexion');
  navigation.navigate('Connexion',{screen:'Singin'});
}

const routeHome = (value, navigation) => {
  try {
    if (value === 1) {
      route_Login_page(navigation);
    } else {
      route_Signin_page(navigation);
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la navigation :', error);
  }
};

const requestread = async (navigation) => {
  const url ='http://localhost:8083/api/books/list';
  const met = 'POST';
  const head = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  };
  responseCurl(url, met, head, { navigation });
}

function responseCurl(url, met, head, { navigation }) {
  fetch(url, { method: met, headers: head})
    .then(response => {
         console.log("response:",response);
         return response.json();// Parse the response as JSON
        })
    .then(data => {
      console.log("data:",data);
      navigation.navigate('crud', { screen: 'crud', params: { donnees : data } });
    })
    .catch(error => {
      console.error('Erreur de réseau:', error);
    });
}


export { routeHome };