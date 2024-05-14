"use client";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CustomButton, CustomInput } from '../../../../components';
import { useAuth } from '../../../../context/AuthProvider';
import { callEndpoint, getHotels, getRoomsByHotel  } from './services/booking-endpoint';
import { Hotel } from '../../../../models';
import Autocomplete from '@mui/material/Autocomplete';


type Room = {
    roomType: string;
    capacity: string;
    price: string;
}

type BookingFormData = {
    names: string;
    lastnames: string;
    gender: string;
    documentType: string;
    documentNumber: string;
    email: string;
    number: string;
    asociateName: string;
    asociateNumber: string;
    // Assuming you also want to associate a hotel and rooms with the booking
    hotel: string; // ID of the selected hotel
    rooms: string[]; // IDs of selected rooms
}

const BookingForm: React.FC = () => {
    const [errorResponse, setErrorResponse] = useState("");
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<string>('');
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset
    } = useForm<BookingFormData>({
        defaultValues: {
            names: '',
            lastnames: '',
            gender: '',
            documentType: '',
            documentNumber: '',
            email: '',
            number: '',
            asociateName: '',
            asociateNumber: '',
            hotel: '', // Initialize with an empty string
            rooms: [] // Initialize with an empty array
        },
        mode: 'onChange'
    });

    const auth = useAuth();
    const accessToken= auth.getAccessToken();
	useEffect(() => {
        // Cargar hoteles al montar el componente
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

    const handleHotelChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const hotelId = event.target.value as string;
        setSelectedHotel(hotelId);
        try {
            const roomsData = await getRoomsByHotel(hotelId);
			const firstRoomType = roomsData.length > 0 ? roomsData[0].roomType : '';
			setSelectedRoom(firstRoomType);
            setRooms(roomsData);
        } catch (error) {
            setErrorResponse('Error loading rooms');
            console.error('Error loading rooms:', error);
        }
    };
	
	

    const onSubmit = async (data: BookingFormData) => {
		const selectedRoomId = rooms.find(room => room.roomType === selectedRoom)?._id || '';
        try {
			const result = await callEndpoint({
				...data,
				hotel: selectedHotel,
				rooms: [selectedRoomId]
			}, accessToken);
	

            if (result) {
                // Handle success response
            } else {
                setErrorResponse('Error al llamar al endpoint');
            }
        } catch (error) {
            setErrorResponse('Ha ocurrido un error al realizar la reserva');
            console.error('Error en la llamada a la API:', error);
        }
        reset(); // Reset form fields after submission
    };

	return (
		<BookingFormWrapper>
			<Box
				sx={{
					bgcolor: 'grey.300',
					borderRadius: '30px',
					p: '50px',
					width: '50%'
				}}
			>
				<FormProvider {...{ register, errors }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<h2>Reserva de Hotel</h2>
						{!!errorResponse && (
							<div className="errorMessage">{errorResponse}</div>
						)}
	
						{/* Nombres */}
						<CustomInput
							name="names"
							label="Nombres"
							type="text"
							required
						/>
	
						{/* Apellidos */}
						<CustomInput
							name="lastnames"
							label="Apellidos"
							type="text"
							required
						/>
	
						{/* Género */}
						<CustomInput
							name="gender"
							label="Género"
							type="text"
							required
						/>

						{/* Género */}
						<CustomInput
							name="birthdate"
							label="fecha de nacimiento"
							type="date"
							required
						/>
	
						{/* Tipo de Documento */}
						<CustomInput
							name="documentType"
							label="Tipo de Documento"
							type="text"
							required
						/>
	
						{/* Número de Documento */}
						<CustomInput
							name="documentNumber"
							label="Número de Documento"
							type="text"
							required
						/>
	
						{/* Correo Electrónico */}
						<CustomInput
							name="email"
							label="Correo Electrónico"
							type="email"
							required
						/>
	
						{/* Número de Teléfono */}
						<CustomInput
							name="number"
							label="Número de Teléfono"
							type="text"
							required
						/>
	
						{/* Nombre del Asociado */}
						<CustomInput
							name="asociateName"
							label="Nombre del Asociado"
							type="text"
							required
						/>
	
						{/* Número del Asociado */}
						<CustomInput
							name="asociateNumber"
							label="Número del Asociado"
							type="text"
							required
						/>
	
                        {/* Selector de hotel */}
                        <FormControl fullWidth>
                            <InputLabel id="hotel-label">Hotel</InputLabel>
                            <Select
                                labelId="hotel-label"
                                id="hotel"
                                value={selectedHotel}
                                onChange={handleHotelChange}
                            >
                                {hotels.map((hotel) => (
                                    <MenuItem key={hotel._id} value={hotel._id}>{hotel.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>


	                        {/* Room Selector */}
							<FormControl fullWidth>
                            <InputLabel id="room-label">Room</InputLabel>
                            <Autocomplete
                                id="room"
                                options={rooms.map((room) => room.roomType)}
                                value={selectedRoom}
                                onChange={(event, newValue) => setSelectedRoom(newValue as string)}
                                renderInput={(params) => <TextField {...params} label="Room" />}
                            />
                        </FormControl>
						<CustomButton
							isDirty={isDirty}
							isValid={isValid}
							type="submit"
						>
							Confirmar Reserva
						</CustomButton>
					</form>
				</FormProvider>
			</Box>
		</BookingFormWrapper>
	);
	
};

export const BookingFormWrapper = styled.div``;

export default BookingForm;
