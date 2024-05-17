import axios from 'axios';
import API_URL from '../../../../../context/authConstants';

export async function callEndpoint(data:any, token:any) {
  try {
    const response = await axios.post(`${API_URL}/booking`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al llamar al endpoint:', error);
    throw error; 
  }
}


export const getHotels = async () => {
    try {
        const response = await axios.get(`${API_URL}/hotels`); 
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener la lista de hoteles');
    }
};


export const getRoomsByHotel = async (hotelId: string) => {
    try {
        const response = await axios.get(`${API_URL}/hotels/${hotelId}/rooms`); 
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener las habitaciones del hotel');
    }
};
