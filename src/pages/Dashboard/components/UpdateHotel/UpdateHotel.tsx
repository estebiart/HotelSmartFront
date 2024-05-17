import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../../../../context/AuthProvider';
import { getHotelInfoById, getHotels, updateHotel } from './services/call-endpoint';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { SelectChangeEvent } from '@mui/material';
import { CustomButton } from '../../../../components';

export type UpdateHotelProps = {
    // types...
}

const UpdateHotel: React.FC<UpdateHotelProps> = ({}) => {
    const [errorResponse, setErrorResponse] = useState("");
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



    const methods = useForm<FormData>({
      mode: "onChange",
    });
  
    const { handleSubmit } = methods;
  

    const auth = useAuth();
    const accessToken = auth.getAccessToken();

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files) {
    //         setSelectedFiles(event.target.files);
    //     }
    // };

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

    const handleHotelChange = (event: SelectChangeEvent<string>) => {
        const hotelId = event.target.value;
        setSelectedHotel(hotelId);
        fetchHotelInfo(hotelId);
    };

    const onSubmit = async () => {

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
        methods.reset();
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
                <FormProvider {...methods}>
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
                        {hotelInfo.images && hotelInfo.images.map((imageUrl:string, index:number) => (
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
                            // onChange={handleFileChange}
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
                            isDirty={true}
                            isValid={true}
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
`;

export default UpdateHotel;
