"use client";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CustomButton, CustomInput } from '../../../../components';
import { useAuth } from '../../../../context/AuthProvider';
import { callEndpoint, getHotels, getRoomsByHotel  } from './services/booking-endpoint';
import { Hotel } from '../../../../models';
import Autocomplete from '@mui/material/Autocomplete';
// import transporter from './services/mailer';
import { SelectChangeEvent } from '@mui/material';



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
    hotel: string; 
    rooms: string[]; 
	checkInDate: string; 
    checkOutDate: string; 
    numberOfPeople: number; 
    destinationCity: string; 
}

const BookingForm: React.FC = () => {
    const [errorResponse, setErrorResponse] = useState("");
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<string>('');
    const [selectedRoom, setSelectedRoom] = useState<string>('');

	const methods = useForm<FormData>({
	  mode: "onChange",
	});
  
	const { handleSubmit } = methods;
  
	const { errors,isDirty, isValid } = methods.formState;
	

    const auth = useAuth();
    const accessToken= auth.getAccessToken();
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

    const handleHotelChange = async (event: SelectChangeEvent<string>) => {
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
	
	// const sendEmailNotification = async (email: string, message: string) => {
	// 	try {
	// 		await transporter.sendMail({
	// 			from: 'test@gmail.com',
	// 			to: email,
	// 			subject: 'Notificación de reserva de hotel',
	// 			text: message
	// 		});
	// 		console.log(`Email sent to ${email}: ${message}`);
	// 	} catch (error) {
	// 		console.error('Error sending email:', error);
	// 		throw new Error('Error sending email');
	// 	}
	// };
	type Room = {
		_id: string;
		roomType: string;
		capacity: string;
		price: string;
	}


    const onSubmit = async (data: FormData) => {
		const selectedRoomId = rooms.find(room => room.roomType === selectedRoom)?._id || '';
        try {
			const result = await callEndpoint({
				...data,
				hotel: selectedHotel,
				rooms: [selectedRoomId]
			}, accessToken);
	

            if (result) {
                // sendEmailNotification(data.email, 'Reserva realizada exitosamente');
            } else {
                setErrorResponse('Error al llamar al endpoint');
            }
        } catch (error) {
            setErrorResponse('Ha ocurrido un error al realizar la reserva');
            console.error('Error en la llamada a la API:', error);
        }
		methods.reset();
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
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<h2>Reserva de Hotel</h2>
						{!!errorResponse && (
							<div className="errorMessage">{errorResponse}</div>
						)}
						<CustomInput
						name="checkInDate"
						label="Fecha de Entrada al Alojamiento"
						type="date"
						required
						/>
						<CustomInput
							name="checkOutDate"
							label="Fecha de Salida del Alojamiento"
							type="date"
							required
						/>
						<CustomInput
							name="numberOfPeople"
							label="Cantidad de Personas que se Alojarán"
							type="number"
							required
						/>
						<CustomInput
							name="destinationCity"
							label="Ciudad de Destino"
							type="text"
							required
						/>
		
						<CustomInput
							name="names"
							label="Nombres"
							type="text"
							required
						/>
	
				
						<CustomInput
							name="lastnames"
							label="Apellidos"
							type="text"
							required
						/>
	
		
						<CustomInput
							name="gender"
							label="Género"
							type="text"
							required
						/>

			
						<label>fecha de nacimiento</label>
						<CustomInput
							name="birthdate"
							label=""
							type="date"
							required
						/>

						<CustomInput
							name="documentType"
							label="Tipo de Documento"
							type="text"
							required
						/>
	

						<CustomInput
							name="documentNumber"
							label="Número de Documento"
							type="text"
							required
						/>
	

						<CustomInput
							name="email"
							label="Correo Electrónico"
							type="email"
							required
						/>
	

						<CustomInput
							name="number"
							label="Número de Teléfono"
							type="text"
							required
						/>
	

						<CustomInput
							name="asociateName"
							label="Nombre del Asociado"
							type="text"
							required
						/>
	

						<CustomInput
							name="asociateNumber"
							label="Número del Asociado"
							type="text"
							required
						/>
	
						<div className='BookingForm'>
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
							<FormControl fullWidth>
							<Autocomplete
								id="room"
								options={rooms.map((room) => room.roomType)}
								value={selectedRoom}
								onChange={(event, newValue) => setSelectedRoom(newValue as string)}
								renderInput={(params) => <TextField {...params} label="Room" />}
							/>
							</FormControl>							
						</div>

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

export const BookingFormWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin:20px;
 .BookingForm{
	display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 30px 0px;
 }
`;

export default BookingForm;
