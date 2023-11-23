const requestCurl = async (username, password, navigation) => {
  let data = JSON.stringify({
    jsonrpc: '2.0',
    method: 'call',
    params: {
      db: 'odoo',
      login: username,
      password: password,
    },
  });
  const url ='http://127.0.0.1:8069/web/session/authenticate';
  const met = 'POST';
  const head = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

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
    .then(response => response.json())  // Parse the response as JSON
    .then(contactData => {
      // Log the retrieved contacts data and navigate to 'Home' screen
      console.log('Contacts:', contactData.result);
      const is_admin = contactData.result.is_admin;
      const username = contactData.result.name;
      navigation.navigate('Root', { screen: 'Home', params: { user: username, admin: is_admin} });
    })
    .catch(error => {
      // Handle errors that may occur during the fetch
      console.error('Error fetching contacts:', error);
    });
}

export default { requestCurl };
