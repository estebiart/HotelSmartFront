import React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export type HotelCardProps = {
    hotel: any; // Tipo de la información del hotel
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {

	
    return (
        <HotelCardStl>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {hotel.name.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={hotel.name}
                    subheader={hotel.place}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={hotel.images[0]} 
                    alt={hotel.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {hotel.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </HotelCardStl>
    );
};

export const HotelCardStl = styled.div`
    /* Agrega estilos según sea necesario */
`;

export default HotelCard;
