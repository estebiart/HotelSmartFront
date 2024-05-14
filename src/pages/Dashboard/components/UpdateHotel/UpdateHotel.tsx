import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CustomButton } from '../../../../components'; // No se necesita CustomInput
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateFormSchema } from './schemas/update-schema';
import { useAuth } from '../../../../context/AuthProvider';
import { callEndpoint, getHotelInfoById, getHotels, getRoomsByHotel, updateHotel } from './services/call-endpoint';

export type UpdateHotelProps = {
    // types...
}

const UpdateHotel: React.FC<UpdateHotelProps> = ({}) => {
    const [errorResponse, setErrorResponse] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [rooms, setRooms] = useState<any[]>([]);
    const [hotelInfo, setHotelInfo] = useState<any>({
        name: '',
        place: '',
        address: '',
        description: ''
    });
    const [selectedHotel, setSelectedHotel] = useState<string>('');
    const [hotels, setHotels] = useState<any[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset
    } = useForm({
        defaultValues: {},
        mode: 'onChange',
        resolver: yupResolver(UpdateFormSchema)
    });

    const auth = useAuth();
    const accessToken = auth.getAccessToken();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);
        }
    };

    const addRoom = () => {
        setRooms([...rooms, { roomType: '', capacity: '', price: '' }]);
    }

    const handleRoomChange = (index: number, field: string, value: string) => {
        const updatedRooms = [...rooms];
        updatedRooms[index][field] = value;
        setRooms(updatedRooms);
    }

    const fetchHotelInfo = async (hotelId: string) => {
        try {
            const hotelInfoData = await getHotelInfoById(hotelId);
            setHotelInfo(hotelInfoData);
        } catch (error) {
            setErrorResponse('Error al cargar la información del hotel');
            console.error('Error en la carga de información del hotel:', error);
        }
    };

    useEffect(() => {
        if (selectedHotel) {
            fetchHotelInfo(selectedHotel);
        }
    }, [selectedHotel]);

	const onSubmit = async (data: any) => {
		try {
			const hotelId = selectedHotel; // Obtén el ID del hotel seleccionado
			const token = accessToken; // Obtén el token de autenticación
			const updatedHotelInfo = { // Crea un objeto con la información actualizada del hotel
				name: data.name,
				place: data.place,
				address: data.address,
				description: data.description,
				// Agrega cualquier otra información que necesites actualizar
			};
			// Llama a la función updateHotel con el ID del hotel, los datos actualizados y el token
			await updateHotel(hotelId, updatedHotelInfo, token);
			// Si la actualización es exitosa, puedes hacer cualquier otra lógica necesaria
		} catch (error) {
			setErrorResponse('Ha ocurrido un error al actualizar el hotel');
			console.error('Error en la llamada a la API:', error);
		}
		reset();
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

    const handleHotelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const hotelId = event.target.value as string;
        setSelectedHotel(hotelId);
    };

    return (
        <UpdateHotelStl>
            <Box
                sx={{
                    bgcolor: 'grey.300',
                    borderRadius: '30px',
                    p: '50px',
                    width: '50%'
                }}
            >
                <FormProvider {...{ register, errors }}>
                    <form onSubmit={handleSubmit(onSubmit)} className="form" encType="multipart/form-data">
                        <h2>Actualizar Hotel</h2>
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

                        <input
                            name="image"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                        <input
                            name="name"
                            placeholder="Nombre"
                            type="text"
                            required
                            defaultValue={hotelInfo.name}
                            onChange={(e) => setHotelInfo({ ...hotelInfo, name: e.target.value })}
                        />
                        <input
                            name="place"
                            placeholder="Ciudad"
                            type="text"
                            required
                            defaultValue={hotelInfo.place}
                            onChange={(e) => setHotelInfo({ ...hotelInfo, place: e.target.value })}
                        />
                        <input
                            name="address"
                            placeholder="Dirección"
                            type="text"
                            required
                            defaultValue={hotelInfo.address}
                            onChange={(e) => setHotelInfo({ ...hotelInfo, address: e.target.value })}
                        />
                        <input
                            name="description"
                            placeholder="Descripción"
                            type="text"
                            required
                            defaultValue={hotelInfo.description}
                            onChange={(e) => setHotelInfo({ ...hotelInfo, description: e.target.value })}
                        />

                        <button type="button" onClick={addRoom}>Agregar Habitación</button>

                        {rooms.map((room, index) => (
                            <div key={index}>
                                <h3>Habitación {index + 1}</h3>
                                <input
                                    name={`room[${index}][roomType]`}
                                    placeholder="Tipo de Habitación"
                                    type="text"
                                    required
                                    value={room.roomType}
                                    onChange={(e) => handleRoomChange(index, 'roomType', e.target.value)}
                                />
                                <input
                                    name={`room[${index}][capacity]`}
                                    placeholder="Capacidad"
                                    type="number"
                                    required
                                    value={room.capacity}
                                    onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
                                />
                                <input
                                    name={`room[${index}][price]`}
                                    placeholder="Precio"
                                    type="number"
                                    required
                                    value={room.price}
                                    onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
                                />
                            </div>
                        ))}

                        <CustomButton
                            isDirty={isDirty}
                            isValid={isValid}
                            type="submit"
                        >
                            Actualizar
                        </CustomButton>
                    </form>
                </FormProvider>
            </Box>
        </UpdateHotelStl>
    );
};

export const UpdateHotelStl = styled.div``;

export default UpdateHotel;
