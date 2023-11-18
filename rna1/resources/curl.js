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
    const url ='http://127.0.0.1:8069/web/session/authenticate';
    const met = 'POST';
    const head = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    responseCurl(url,met,head,data);
}

function responseCurl(url,met,head,data){
    fetch(url,{
    method:met,
    headers:head,
    body:data,
    })
    .then(response => response.json())
    .then(contactData => {
      console.log('Contacts:', contactData.result);
    })
    .catch(error => {
      console.error('Error fetching contacts:', error);
    })
}

export default {requestCurl};