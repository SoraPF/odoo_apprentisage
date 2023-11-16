import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('http://odoo.local/fr_BE/frontend_contact/contact', {
      headers: {
        Authorization: 'Bearer votre-jeton-d-authentification',
      },
    });

    // Accédez aux données renvoyées par l'API
    const responseData = response.data;

    // Faites quelque chose avec les données
    console.log('Données récupérées:', responseData);

    // Par exemple, si les données sont un tableau d'utilisateurs
    responseData.users.forEach(user => {
      console.log('Nom d\'utilisateur:', user.username);
      console.log('Mot de passe:', user.password);
    });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
  }
};

// Appelez la fonction pour récupérer les données
fetchData();
