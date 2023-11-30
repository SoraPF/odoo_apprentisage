const requestCurl = async (username, password, navigation) => {
  let data = JSON.stringify({
    jsonrpc: '2.0',
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

const get_set_cookies = function(headers) {
    const set_cookies = []
    for (const [name, value] of headers) {
        if (name === "set-cookie") {
            set_cookies.push(value)
        }
    }
    return set_cookies
}

function responseCurl(url, met, head, data, { navigation }) {
  // Using the fetch function to make a network request
  fetch(url, {
    method: met,     // HTTP method (e.g., 'GET', 'POST')
    headers: head,   // Request headers
    body: data,      // Request body data
  })
    .then(response => {
     const set_cookies = get_set_cookies(response.headers)
     console.log("cookie:",set_cookies);
     console.log("response:",response);
     console.log("response_headers:",response.headers);
     return response.json();// Parse the response as JSON
    })
    .then(contactData => {
      console.log("data:",contactData);
    /*
      console.log('avant résultat:', contactData);
      console.log('résultat:', contactData.result);
      const data = contactData.result;
      navigation.navigate('Root', { screen: 'Home', params: { donner : data } });*/
    })
    .catch(error => {
      // Handle errors that may occur during the fetch
      console.error('Error fetching contacts:', error);
    });
}

export default { requestCurl };
