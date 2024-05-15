import axios from 'axios';
import API_URL from '../../../../../context/authConstants';


export async function callEndpoint() {
  try {
    const response = await axios.get(`${API_URL}/booking`, {

    });
    return response.data;
  } catch (error) {
    console.error('Error al llamar al endpoint:', error);
    throw error; 
  }
}

export async function getHotelName(hotelId: string, token: any) {
  try {
    const response = await axios.get(`${API_URL}/hotels/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      }
    });
    return response.data.name; 
  } catch (error) {
    console.error('Error al obtener el nombre del hotel:', error);
    throw error; 
  }
}


export async function getRoomNames(roomIds: string[], hotelId: string, token: string) {
  try {
    const roomTypes = await Promise.all(roomIds.map(async (roomId) => {
      const response = await axios.get(`${API_URL}/hotels/${hotelId}/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
        }
      });
      return response.data.map((room: any) => room.roomType);
    }));
    return roomTypes.flat();
  } catch (error) {
    console.error('Error al obtener los nombres de las habitaciones:', error);
    throw error; 
  }
}
