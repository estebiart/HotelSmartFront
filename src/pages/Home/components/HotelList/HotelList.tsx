import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination, TextField } from '@mui/material';
import { callEndpoint } from './services/hotels-list-endpoint';
import { HotelCard } from '../HotelCard';
import SearchIcon from '@mui/icons-material/Search';
import { styled as styledMui, alpha } from '@mui/material/styles';

export type HotelListProps = {

}

const HotelList: React.FC<HotelListProps> = ({}) => {
    const [hotels, setHotels] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callEndpoint();
                setHotels(data);
            } catch (error) {
                console.error('Error al obtener la lista de hoteles:', error);
            }
        }
        fetchData();
    }, []);

    const handleSearch = (value: string) => {
        setFilter(value);
    };

    const filteredHotels = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(filter.toLowerCase())
    );

    const hotelsPerPage = 8;
    const indexOfLastHotel = page * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

    const SearchContainer = styledMui('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        width: '60vw',
        margin: 'auto',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
    }));

    const SearchIconWrapper = styledMui('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    return (
        <HotelListStl>
            <div className='search'>
            <div className='search__description'>
                <h3>Encuentra tu próximo alojamiento</h3>
                <p>Busca ofertas en hoteles, casas, departamentos y mucho más</p>
            </div>
            <SearchContainer>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                        <TextField
                            label="Buscar hotel"
                            value={filter}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
            </SearchContainer>
            </div>
            <div className='HotelList'>
                {currentHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                ))}
            </div>
            <Pagination
                count={Math.ceil(filteredHotels.length / hotelsPerPage)}
                page={page}
                onChange={(event, value) => setPage(value)}
            />
        </HotelListStl>
    );
};

const HotelListStl = styled.div`
    padding: 5rem; 
   .HotelList {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
    padding: 3rem;
   }
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

export default HotelList;
