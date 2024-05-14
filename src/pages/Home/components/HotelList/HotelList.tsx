"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination, TextField, Button } from '@mui/material'; // Importa componentes de Material-UI según necesites
import { callEndpoint } from './services/hotels-list-endpoint';
import { HotelCard } from '../HotelCard';



// Importa los estilos según sea necesario
export type HotelListProps = {
	// types...
}

const HotelList: React.FC<HotelListProps> = ({}) => {
    const [hotels, setHotels] = useState<any[]>([]); // Define el estado para almacenar la lista de hoteles
    const [page, setPage] = useState(1); // Estado para el número de página actual
    const [filter, setFilter] = useState(''); // Estado para el filtro de búsqueda

    useEffect(() => {
        async function fetchData() {
            try {
	
                const data = await callEndpoint( ); // Llama a la función para obtener los hoteles
                setHotels(data); // Actualiza el estado con la lista de hoteles obtenida
            } catch (error) {
                console.error('Error al obtener la lista de hoteles:', error);
            }
        }
        fetchData();
    }, []); // Llama a la función una vez al montar el componente

    // Lógica para filtrar la lista de hoteles
    const filteredHotels = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <HotelListStl>
            {/* Renderiza los componentes de hoteles aquí */}
            {/* Por ejemplo, podrías usar un map para mostrar cada hotel */}
			
            {filteredHotels.map((hotel) => (
				<HotelCard key={hotel.id} hotel={hotel} />
            ))}
            {/* Implementa la paginación según sea necesario */}
            <Pagination count={10} page={page} onChange={(event, value) => setPage(value)} />
            {/* Implementa filtros de búsqueda según sea necesario */}
            <TextField
                label="Buscar hotel"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <Button variant="contained" onClick={() => setFilter('')}>
                Limpiar filtro
            </Button>
        </HotelListStl>
    );
};

export const HotelListStl = styled.div`
min-heigth:100vh;
padding: 5rem; 
    /* Agrega estilos según sea necesario */
`;

export default HotelList;

