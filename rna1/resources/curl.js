const requestCurl = async (username, password) => {
    let data = JSON.stringify({
        db: 'odoo',
        login: username,
        password: password,
    });

    fetch('http://127.0.0.1:8069/web/session/authenticate',{
        jsonrpc: '2.0',
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data:data,
    }).then(response =>{
        console.log("response",response);
    }).catch(error =>{
        console.log("error:",error);
    })

}

export default {requestCurl};