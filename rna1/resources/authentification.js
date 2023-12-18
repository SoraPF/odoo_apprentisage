import axios from 'axios';

const authenticateAndGetSession = async (username, password) => {
    const odooAuthEndpoint = 'http://localhost:8069/frontend_contact/session/authenticate';
    const js = '2.0';
    const params =  {db: 'odoo', login: username, password: password,};
    tryAuthen(odooAuthEndpoint, js, params);
};

const tryAuthen = async (url,type,params) => {
  try {
    const response = await axios.post(url, {
      jsonrpc: type,
      params: params,
      withCredentials: true,
    });
    console.log('response', response);
  } catch (error) {
    if (error.isAxiosError) {
    console.error('Axios Error Details:', error.toJSON());
    return 0;
    } else {
      console.error('Non-Axios Error:', error);
      return 0;
    }
  }
};

export default {authenticateAndGetSession};