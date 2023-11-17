import axios from 'axios';

const authenticateAndGetSession = async (username, password) => {
  try {
    const odooAuthEndpoint = 'http://127.0.0.1:8069/web/session/authenticate';

    const authResponse = await axios.post(odooAuthEndpoint, {
      jsonrpc: '2.0',
      params: {
        db: 'odoo',
        login: username,
        password: password,
      },
    });

    // Assuming the authentication response contains a session ID
    const sessionId = authResponse.data.result.session_id;
    console.log("bonjour odoo",sessionId);
    // Call your fetchData function with the obtained session ID
    await fetchData(sessionId);
  } catch (error) {
    if (error.isAxiosError) {
    console.error('Axios Error Details:', error.toJSON());
    } else {
      console.error('Non-Axios Error:', error);
    }
  }
};

const fetchData = async (sessionId) => {
  try {
    const odooApiEndpoint = 'https://127.0.0.1:8069/fr_BE/frontend_contact/contact';

    const response = await axios.get(odooApiEndpoint, {
      headers: {
        Cookie: `session_id=${sessionId}`,
      },
    });
    console.log("dernier réponse d'odoo",response.data);
    // Handle the API response as needed
    const responseData = response.data;
    console.log('Data retrieved:', responseData);
  } catch (error) {
    console.error('API request error:', error);
  }
};

export default {authenticateAndGetSession};