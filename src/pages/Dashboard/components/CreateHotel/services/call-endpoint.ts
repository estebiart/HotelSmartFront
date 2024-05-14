import axios from 'axios';
import API_URL from '../../../../../context/authConstants';

export async function callEndpoint(data:any, token:any) {
  try {
    const response = await axios.post(`${API_URL}/hotels`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al llamar al endpoint:', error);
    throw error; 
  }
}
