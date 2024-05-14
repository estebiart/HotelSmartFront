import axios from 'axios';
import API_URL from '../../../context/authConstants';

export async function callEndpoint(data:any) {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
  } catch (error) {
    console.error('Error al llamar al endpoint:', error);
    throw error; 
  }
}
