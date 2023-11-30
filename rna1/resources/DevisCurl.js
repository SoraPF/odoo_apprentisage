const deviCurl = async (navigation,name) => {
  let data = JSON.stringify({
    jsonrpc: '2.0',
    params: {username:name},
  });
  const url ='http://127.0.0.1:8069/devis/user';
  const met = 'POST';
  const head = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  // Pass the username and navigation parameters to responseCurl
  responseCurl(url, met, head, data, { navigation });
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
  console.log('Réponse réussie:', data.result);
  const infoContact = data.result.response;
})
.catch(error => {
  console.error('Erreur de réseau:', error);
});
}

export default { deviCurl };
