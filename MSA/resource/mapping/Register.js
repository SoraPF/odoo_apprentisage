
const requestRegister = async (navigation, nom, prenom, email, mdp, mobile, age) => {
  let data = JSON.stringify({
    id : 1,
	nom : nom,
	prenom : prenom,
	email : email,
	motDePasse : mdp,
	mobile : mobile,
	age : age
  });
  const url ='http://localhost:8082/api/user/create';
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
    headers: head,
    body: data,
  })
    .then(response => {
     navigation.navigate('Crud',{screen:'crud'});
    })
    .catch(error => {
      console.error('Error fetching contacts:', error);
    });
}

export default { requestRegister };
