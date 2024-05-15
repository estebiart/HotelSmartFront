import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../../../../context/AuthProvider';
import { getHotelInfoById, getHotels, updateHotel } from './services/call-endpoint';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { CustomButton } from '../../../../components';

export type UpdateHotelProps = {
    // types...
}

const UpdateHotel: React.FC<UpdateHotelProps> = ({}) => {
    const [errorResponse, setErrorResponse] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [hotelInfo, setHotelInfo] = useState<any>({
        name: '',
        place: '',
        address: '',
        description: '',
        images: [],
        availability:true
    });
    const [selectedHotel, setSelectedHotel] = useState<string>('');
    const [hotels, setHotels] = useState<any[]>([]);
    const [rooms, setRooms] = useState<any[]>([]); 

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: 'onChange',
    });

    const auth = useAuth();
    const accessToken = auth.getAccessToken();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);
        }
    };

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
        setRooms([]);
        fetchHotelInfo(hotelId);
    };

    const onSubmit = async (data: any) => {
        console.log("data", data)
        console.log("info", hotelInfo)
        try {
            const hotelId = selectedHotel;
            const token = accessToken;
            const updatedHotelInfo = {
                name: hotelInfo.name,
                place: hotelInfo.place,
                address: hotelInfo.address,
                description: hotelInfo.description,
                availability:hotelInfo.availability
            };

            await updateHotel(hotelId, updatedHotelInfo, token);


        } catch (error) {
            setErrorResponse('Ha ocurrido un error al actualizar el hotel');
            console.error('Error en la llamada a la API:', error);
        }
        reset();
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
                        <h2>Imágenes del Hotel</h2>
                        {hotelInfo.images && hotelInfo.images.map((imageUrl, index) => (
                            <img key={index} src={imageUrl} alt={`Hotel Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
                        ))}
                       
                        <input
                            name="availability"
                            type="checkbox"
                            value={hotelInfo.availability}
                        />
                         <label>Habilitar</label>
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
                            value={hotelInfo.name}
                            onChange={(e) => setHotelInfo({ ...hotelInfo, name: e.target.value })}
                        />
                        <input
                            name="place"
                            placeholder="Ciudad"
                            type="text"
                            value={hotelInfo.place}
                            onChange={(e) => setHotelInfo({ ...hotelInfo, place: e.target.value })}
                        />
                        <input
                            name="address"
                            placeholder="Dirección"
                            type="text"
                            value={hotelInfo.address}
                            onChange={(e) => setHotelInfo({ ...hotelInfo, address: e.target.value })}
                        />
                        <input
                            name="description"
                            placeholder="Descripción"
                            type="text"
                            value={hotelInfo.description}
                            onChange={(e) => setHotelInfo({ ...hotelInfo, description: e.target.value })}
                        />

                        <CustomButton
                            isDirty="true"
                            isValid="true"
                            type="submit"
                        >
                            Crear Nuevo Hotel
                        </CustomButton>
                    </form>
                </FormProvider>
            </Box>
        </UpdateHotelStl>
    );
};

export const UpdateHotelStl = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px;
`;

export default UpdateHotel;
