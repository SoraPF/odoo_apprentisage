const requestCurl = async (username, password) => {
    let data = JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: {
        db: 'odoo',
        login: username,
        password: password,
      },
    });

    fetch('http://127.0.0.1:8069/web/session/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(response => response.json())
      .then(data => {
        console.log('response', data.result);
      })
      .catch(error => {
        console.log('error:', error);
      });

}

export default {requestCurl};