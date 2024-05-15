// En el componente BookingList

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { callEndpoint, getHotelName, getRoomNames } from './services/booking-list-endpoint';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../../../context/AuthProvider';
import { PromiseHandler } from '../../../../components/PromiseHandler';


export type BookingListProps = {
    // types...
}

const BookingList: React.FC<BookingListProps> = ({}) => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');
    const auth = useAuth();
    const accessToken = auth.getAccessToken();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callEndpoint();
                setBookings(data);
            } catch (error) {
                console.error('Error al obtener la lista de reservas:', error);
            }
        }
        fetchData();
    }, []);

    const handleSearch = (value: string) => {
        setFilter(value);
    };

    const fetchHotelAndRoomData = async (booking) => {
        try {
            const hotelName = await getHotelName(booking.hotel, accessToken);
            const roomNames = await getRoomNames(booking.rooms, booking.hotel, accessToken);
            return { hotelName, roomNames };
        } catch (error) {
            console.error('Error al obtener datos del hotel y las habitaciones:', error);
            return { hotelName: 'Nombre no disponible', roomNames: ['Nombres no disponibles'] };
        }
    };

    const bookingsPerPage = 8;
    const indexOfLastBooking = page * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    return (
        <BookingListStl>
            <div className='search'>
                <div className='search__description'>
                    <h3>Reservas</h3>
                </div>
                <div className='searchContainer'>
                    <TextField
                        label="Buscar reserva"
                        value={filter}
                        onChange={(e) => handleSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }}
                    />
                </div>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre del hotel</TableCell>
                            <TableCell>Habitaciones</TableCell>
                            <TableCell>Nombres</TableCell>
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Fecha de nacimiento</TableCell>
                            <TableCell>Género</TableCell>
                            <TableCell>Tipo de documento</TableCell>
                            <TableCell>Número de documento</TableCell>
                            <TableCell>Correo electrónico</TableCell>
                            <TableCell>Número de teléfono</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentBookings.map((booking) => {
                            return (
                                <TableRow key={booking._id}>
                                    <TableCell>
                                        <PromiseHandler promise={() => fetchHotelAndRoomData(booking)}>
                                            {({ hotelName }) => hotelName}
                                        </PromiseHandler>
                                    </TableCell>
                                    <TableCell>
                                        <PromiseHandler promise={() => fetchHotelAndRoomData(booking)}>
                                            {({ roomNames }) =>
                                                roomNames.map((roomName: string, index: number) => (
                                                    <div key={index}>{roomName}</div>
                                                ))
                                            }
                                        </PromiseHandler>
                                    </TableCell>
                                    <TableCell>{booking.names}</TableCell>
                                    <TableCell>{booking.lastnames}</TableCell>
                                    <TableCell>{booking.birthdate}</TableCell>
                                    <TableCell>{booking.gender}</TableCell>
                                    <TableCell>{booking.documentType}</TableCell>
                                    <TableCell>{booking.documentNumber}</TableCell>
                                    <TableCell>{booking.email}</TableCell>
                                    <TableCell>{booking.number}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(bookings.length / bookingsPerPage)}
                page={page}
                onChange={(event, value) => setPage(value)}
            />
        </BookingListStl>
    );
};

const BookingListStl = styled.div`
    padding: 5rem; 
   .search{
    background-color: #1976d2;
    padding-bottom:30px;
    color: white;
   }

   .search__description {
       padding-top: 30px;

   }
   h3 {
       font-size: 32px;
   }
   label {
       color: white !important;
       padding-left: 30px;
       margin-bottom: 30px;
   }
   .MuiFormControl-root{
    width: 100%;
   }
   .MuiFormControl-root input{
    color: white !important;
    border:none;
    padding-left:60px;
   }
   ul{
    justify-content: center;
   }
   legend span{
    color:white !important;
   }
`;

export default BookingList;
