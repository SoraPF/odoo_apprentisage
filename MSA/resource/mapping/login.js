
const requestCurl = async (username, password, navigation) => {
console.log(username,password);
  const data = JSON.stringify({
      nom: username,
      motDePasse: password
  });
  const url ='http://localhost:8082/api/user/login';
  const met = 'POST';
  const head = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  }
  responseCurl(url, met, head, data, { navigation });
}

function responseCurl(url, met, head, data, { navigation }) {
  fetch(url, {
    method: met,
    mode:'cors',
    credentials: 'include',
    headers: head,
    body: data,
  })
    .then(response => {
     console.log("response:",response);
      navigation.navigate('Crud',{screen:'crud'});
    })
    .catch(error => {
      console.error('Error fetching contacts:', error);
    });
}

export default { requestCurl };
