import axios from 'axios';
import API_URL from '../../../../../context/authConstants';

export async function addRoomsToHotel(hotelId: any, roomsData: any, token: any) {
  try {

    const requestData = {
        hotelId: hotelId,
        roomsData: roomsData
      };
    const response = await axios.post(`${API_URL}/hotels/${hotelId}/rooms`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al agregar habitaciones al hotel:', error);
    throw error; 
  }
}
