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
// Función para obtener la lista de hoteles
export const getHotels = async () => {
  try {
      const response = await axios.get(`${API_URL}/hotels`); 
      console.log("response gethotels",response );
      // Cambia la URL por la ruta correcta en tu backend
      return response.data;
  } catch (error) {
      throw new Error('Error al obtener la lista de hoteles');
  }
};

// Función para obtener las habitaciones de un hotel específico
export const getRoomsByHotel = async (hotelId: string) => {
  try {
      const response = await axios.get(`${API_URL}/hotels/${hotelId}/rooms`); 
      console.log("response getRoomsByHotel",response );
      return response.data;
  } catch (error) {
      throw new Error('Error al obtener las habitaciones del hotel');
  }
};
export const getHotelInfoById = async (hotelId: string) => {
  try {
      const response = await axios.get(`${API_URL}/hotels/${hotelId}`); 
      return response.data;
  } catch (error) {
      throw new Error('Error fetching hotel information');
  }
};

export const updateHotel = async (hotelId: string, data: any, token: any) => {
  try {
    const response = await axios.put(`${API_URL}/hotels/${hotelId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el hotel:', error);
    throw error; 
  }
};