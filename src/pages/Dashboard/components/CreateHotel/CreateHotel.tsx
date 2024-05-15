import { Box } from '@mui/material';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CustomButton, CustomInput } from '../../../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthResponse } from '../../../../models/types';
import { callEndpoint } from './services/call-endpoint';
import { CreateFormSchema } from './schemas/create-schema';
import { useAuth } from '../../../../context/AuthProvider';
import { addRoomsToHotel } from './services/addRooms-endpoint';


export type CreateHotelProps = {
    // types...
}

const CreateHotel: React.FC<CreateHotelProps> = ({}) => {
    const [errorResponse, setErrorResponse] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [rooms, setRooms] = useState<any[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset
    } = useForm({
        defaultValues: {
            name: '',
            place: '',
            address: '',
            description: ''
        },
        mode: 'onChange',
        resolver: yupResolver(CreateFormSchema)
    });

    const auth = useAuth();
    const accessToken= auth.getAccessToken();
    

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
    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('place', data.place);
            formData.append('address', data.address);
            formData.append('description', data.description);
            rooms.forEach((room, index) => {
              formData.append(`room[${index}][roomType]`, room.roomType);
              formData.append(`room[${index}][capacity]`, room.capacity);
              formData.append(`room[${index}][price]`, room.price);
          });

            if (selectedFiles) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append('image', selectedFiles[i]);
                }
            }
            
            const result = await callEndpoint(formData, accessToken);
            

            if (result) {

              const hotelId = result._id; 
              const result2 = await addRoomsToHotel(hotelId, rooms, accessToken)
              if (result2) {
                setSuccessMessage('Hotel creado con éxito');
                setFormSubmitted(true);
                } else {
                    setErrorResponse('Error al llamar al endpoint');
                }
            } else {
                setErrorResponse('Error al llamar al endpoint');
            }
        } catch (error) {
            setErrorResponse('Ha ocurrido un error al crear hotel');
            console.error('Error en la llamada a la API:', error);
        }
        reset();
    };

    return (
        <CreateHotelStl>
            <Box
                sx={{
                    bgcolor: 'grey.300',
                    borderRadius: '30px',
                    p: '50px',
                    width: '50%'
                }}
            >
                <FormProvider {...{ register, errors }}>
                    <form onSubmit={handleSubmit(onSubmit)} className={`form ${formSubmitted ? 'hidden' : ''}`}  encType="multipart/form-data">
                        <h2>Registro de nuevo Hotel</h2>
                        {!!errorResponse && (
                            <div className="errorMessage">{errorResponse}</div>
                        )}
                        <input
                            name="image"
                            type="file"
                            multiple
                            onChange={handleFileChange} 
                        />
                        <CustomInput
                            name="name"
                            label="Nombre"
                            type="text"
                            required
                        />
                        <CustomInput
                            name="place"
                            label="Ciudad"
                            type="text"
                            required
                        />
                        <CustomInput
                            name="address"
                            label="Dirección"
                            type="text"
                            required
                        />
                        <CustomInput
                            name="description"
                            label="Descripción"
                            type="text"
                            required
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
                            Crear Nuevo Hotel
                        </CustomButton>
                    </form>
                </FormProvider>
                {formSubmitted && (
                    <div className="successMessage">{successMessage}</div>
                )}
            </Box>
        </CreateHotelStl>
    );
};

export const CreateHotelStl = styled.div`
display: flex;
justify-content: center;
margin: 30px;`;

export default CreateHotel;
