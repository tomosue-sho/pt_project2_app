import axios from 'axios';

export const getToken = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      email: 'tomotomosho1006@gmail.com',
      password: '2253689123a',
    });
    return response.data.access;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};
