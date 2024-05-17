import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../../../../context/AuthProvider';
import {  getHotels, getRoomsForHotel, updateRoom } from './services/call-endpoint'; 
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { CustomButton } from '../../../../components';
import { SelectChangeEvent } from '@mui/material';

export type UpdateRoomProps = {
    // tipos...
}

const UpdateRoom: React.FC<UpdateRoomProps> = ({}) => {
    const [errorResponse, setErrorResponse] = useState("");
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const [rooms, setRooms] = useState<any[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<string>('');
    const [hotels, setHotels] = useState<any[]>([]);
	const [room, setRoom] = useState<any>({
		roomType: '',
		capacity: 0,
		price: 0,
	  });

	  useEffect(() => {
		if (selectedRoom) {
			setRoom({
				roomType: selectedRoom.roomType,
				capacity: selectedRoom.capacity,
				price: selectedRoom.price,
				availability:selectedRoom.availability,
			});
		} else {
			setRoom({
				roomType: '',
				capacity: 0,
				price: 0,
				availability:true
			});
		}
	}, [selectedRoom]);
	
	
	const handleRoomChange = (field: string, value: any) => {
		const fieldValue = field === 'availability' ? value : room[field];
	
		setRoom({
			...room,
			[field]: fieldValue,
		});
	};
    
    const auth = useAuth();
    const accessToken = auth.getAccessToken();

    const methods = useForm<FormData>({
      mode: "onChange",
    });
  
    const { handleSubmit } = methods;
  

    const loadRooms = async (hotelId: string) => {
        try {
            const roomData = await getRoomsForHotel(hotelId);
            setRooms(roomData);
        } catch (error) {
            setErrorResponse('Error al cargar las habitaciones');
            console.error('Error en la carga de habitaciones:', error);
        }
    };

    useEffect(() => {
        loadHotels();
    }, []);

    const loadHotels = async () => {
        try {
            const hotelData = await getHotels();
            setHotels(hotelData);
		
        } catch (error) {
            setErrorResponse('Error al cargar los hoteles');
            console.error('Error en la carga de hoteles:', error);
        }
    };

    const handleHotelChange = (event: SelectChangeEvent<string>) => {
        const hotelId = event.target.value as string;
        setSelectedHotel(hotelId);
        setRooms([]);
        loadRooms(hotelId);
    };

    const onSubmit = async () => {
        try {
            if (selectedRoom && selectedRoom.hotel) {
                const { hotel, _id } = selectedRoom;
                const token = accessToken;
                const updatedRoomInfo = {
                    roomType: room.roomType,
                    capacity: room.capacity,
                    price: room.price,
                    availability: room.availability
                };
                await updateRoom(hotel, _id, updatedRoomInfo, token);
            } else {
                throw new Error('Hotel no seleccionado');
            }
        } catch (error) {
            setErrorResponse('Ha ocurrido un error al actualizar la habitación');
            console.error('Error en la llamada a la API:', error);
        }
        methods.reset();
    };

    return (
        <UpdateRoomStl>
            <Box
                sx={{
                    bgcolor: 'grey.300',
                    borderRadius: '30px',
                    p: '50px',
                    width: '50%'
                }}
            >
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="form" encType="multipart/form-data">
                        <h2>Actualizar Habitación</h2>
                        {!!errorResponse && (
                            <div className="errorMessage">{errorResponse}</div>
                        )}
                        <FormControl fullWidth>
                            <InputLabel id="hotel-label">Seleccionar Hotel</InputLabel>
                            <Select
                                labelId="hotel-label"
                                id="hotel"
                                value={selectedHotel}
                                onChange={handleHotelChange}
                            >
                                {hotels.map((hotel) => (
                                    <MenuItem key={hotel.id} value={hotel._id}>{hotel.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="room-label">Seleccionar Habitación</InputLabel>
                            <Select
                                labelId="room-label"
                                id="room"
                                value={selectedRoom}
                                onChange={(event) => setSelectedRoom(event.target.value)}
                            >
                                {rooms.map((room) => (
                                    <MenuItem key={room._id} value={room}>{room.roomType}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
						<input
							name="availability"
							type="checkbox"
							checked={room.availability}
							onChange={(e) => handleRoomChange('availability', e.target.checked)} 
						/>
						<label>Habilitar</label>
                    
					
						<FormControl fullWidth>
							<label id="room-label">Tipo de Habitación</label>
							<input
								name="roomType"
								placeholder="Tipo de Habitación"
								type="text"
								required
								value={room.roomType}
								onChange={(e) => handleRoomChange('roomType', e.target.value)}
							/>
						</FormControl>
							
								<FormControl fullWidth>
								<label id="capacity-label">Capacidad</label>
								<input
									name="capacity"
									placeholder="Capacidad"
									type="number"
									required
									value={room.capacity}
									onChange={(e) => handleRoomChange('capacity', e.target.value)}
								/>
								</FormControl>

								<FormControl fullWidth>
								<label id="price-label">Precio</label>
								<input
									name="price"
									placeholder="Precio"
									type="number"
									required
									value={room.price}
									onChange={(e) => handleRoomChange('price', e.target.value)}
								/>
								</FormControl>


                        <CustomButton
                            isDirty={true}
                            isValid={true}
                            type="submit"
                        >
                            Actualizar Habitación
                        </CustomButton>
                    </form>
                </FormProvider>
            </Box>
        </UpdateRoomStl>
    );
};

export const UpdateRoomStl = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px;
    input{
        font: inherit;
        letter-spacing: inherit;
        color: currentcolor;
        border: 0px;
        box-sizing: content-box;
        background: none;
        height: 1.4375em;
        margin: 0px;
        -webkit-tap-highlight-color: transparent;
        display: block;
        min-width: 0px;
        width: 100%;
        animation-name: mui-auto-fill-cancel;
        animation-duration: 10ms;
        padding: 16.5px 14px;
    }
    .MuiFormControl-root{
        margin: 10px
    }
`;

export default UpdateRoom;
