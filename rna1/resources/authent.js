import axios from 'axios';

const odooUrl = 'http://localhost:8069';
const authenticateAndGetSession = async (username, password) => {
  const data = {
  jsonrpc: '2.0',
  method: 'call',
  params: {
    service: 'common',
    method: 'login',
    args: [username, password, {}],
  },
};
axios.post(`${odooUrl}/web/session/authenticate`, data)
  .then(response => {
    const sessionId = response.data.result.session_id;
    console.log('Session ID:', sessionId);
    // Faites quelque chose avec la session, par exemple, effectuez d'autres requêtes pour récupérer des données.
  })
  .catch(error => {
    console.error('Erreur lors de l\'authentification:', error);
  });
};

export default {
  authenticateAndGetSession,
};