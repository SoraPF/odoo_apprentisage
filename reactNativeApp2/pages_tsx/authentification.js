import axios from 'axios';

const authenticateAndGetSession = async (username, password) => {
  try {
    const odooAuthEndpoint = 'https://your_odoo_url/web/session/authenticate';

    const authResponse = await axios.post(odooAuthEndpoint, {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        db: 'odoo',
        login: username,
        password: password,
      },
    });

    // Assuming the authentication response contains a session ID
    const sessionId = authResponse.data.result.session_id;

    // Call your fetchData function with the obtained session ID
    await fetchData(sessionId);
  } catch (error) {
    console.error('Authentication error:', error);
  }
};

const fetchData = async (sessionId) => {
  try {
    const odooApiEndpoint = 'https://your_odoo_url/fr_BE/frontend_contact/contact';

    const response = await axios.get(odooApiEndpoint, {
      headers: {
        Cookie: `session_id=${sessionId}`,
      },
    });

    // Handle the API response as needed
    const responseData = response.data;
    console.log('Data retrieved:', responseData);
  } catch (error) {
    console.error('API request error:', error);
  }
};

authenticateAndGetSession();