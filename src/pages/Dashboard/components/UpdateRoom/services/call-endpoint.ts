import axios from 'axios';
import API_URL from '../../../../../context/authConstants';


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
export const getHotelInfoById = async (hotelId: string) => {
  try {
      const response = await axios.get(`${API_URL}/hotels/${hotelId}`); 
      console.log("response ",response )
      return response.data;
  } catch (error) {
      throw new Error('Error fetching hotel information');
  }
};




export async function getRoomsForHotel(hotelId:string) {
    try {
      console.log("hotelId",hotelId);
        const response = await axios.get(`${API_URL}/hotels/${hotelId}/rooms`);
        console.log("resopnses",response);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las habitaciones del hotel:', error);
        throw error;
    }
}

export async function updateRoom(hotelId:string, roomId:number, updatedRoomInfo:any, token:string |void) {
  try {
      const response = await axios.put(`${API_URL}/hotels/${hotelId}/rooms/${roomId}`, updatedRoomInfo, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error updating room:', error);
      throw error;
  }
}