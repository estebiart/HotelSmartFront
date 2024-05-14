import axios from 'axios';
import API_URL from '../../../../../context/authConstants';

export async function callEndpoint( ) {
  try {
    const response = await axios.get(`${API_URL}/hotels`);
    return response.data;
  } catch (error) {
    console.error('Error al llamar al endpoint:', error);
    throw error; 
  }
}