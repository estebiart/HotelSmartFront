"use client";
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { CustomDialog } from '../CustomDialog';
import { dialogOpenSubject$ } from '../CustomDialog/CustomDialog';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAuth } from "../../context/AuthProvider";
import  API_URL  from "../../context/authConstants";


export type NavbarProps = {
	layoutType: 'Layout' | 'PortalLayout';
}
const StyledFab = styled(Fab)({
	position: 'absolute',
	zIndex: 1,
	top: -30,
	left: 0,
	right: 0,
	margin: '0 auto',
  });
const Navbar: React.FC<NavbarProps>  = ({layoutType}) => {
	const auth = useAuth();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  
	const handleClick = () =>{
		dialogOpenSubject$.setSubject = true;
	}
	async function handleSignOut(e: MouseEvent) {
		e.preventDefault();
	
		try {
		  const response = await fetch(`${API_URL}/signout`, {
			method: "DELETE",
			headers: {
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${auth.getRefreshToken()}`,
			},
		  });
		  if (response.ok) {
			auth.signout();
		  }
		} catch (error) {
		  console.log(error);
		}
	  }
	return (
	<Box sx={{ flexGrow: 1 }}>
	
      <AppBar position="fixed">
		<Toolbar sx={{ justifyContent: isMobile ? 'center' : 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: isMobile ? 'center' : 'left' }}>
				<Link  to="/"  color="white">
					Hoteles Smart
				</Link>
				{!isMobile && layoutType === 'PortalLayout' &&(
				<Button  variant='outlined'>
					<Link to="/me">{auth.getUser()?.username ?? ""}</Link>
				</Button> )}
            </Typography>
		  {!isMobile && layoutType === 'Layout' &&(
		  <Box sx={{ display: 'flex' }}>
					<Button  variant='outlined'> 
						<Link to="/signup">Crear cuenta</Link>
					</Button>
					<Button  variant='outlined'>
						<Link to="/login">Iniciar Sesión</Link>
					</Button>
					<Button  variant='contained' onClick={handleClick}> <FavoriteBorderIcon/> </Button>
		  </Box>
		  )}
		  {!isMobile && layoutType === 'PortalLayout' &&(
		  <Box sx={{ display: 'flex' }}>
					<Button  variant='outlined'> 
		  				<Link to="/dashboard">Dashboard</Link>
					</Button>
					<Button  variant='outlined'>
					    <Link to="/me">Profile</Link>
					</Button>
					<Button variant='contained' onClick={handleSignOut}>
					Sign out
					</Button>
		  </Box>
		  )}
		  {isMobile && (
		<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
			<Toolbar>
			<IconButton color="inherit" aria-label="open drawer">
				<MenuIcon />
			</IconButton>
			{layoutType === 'Layout' && (
			<StyledFab color="secondary" aria-label="add" onClick={handleClick}>
					<FavoriteBorderIcon/> 
			</StyledFab>
			)}
			<Box sx={{ flexGrow: 1 }} />
			<IconButton color="inherit">
				<SearchIcon />
			</IconButton>
			<IconButton color="inherit">
				<MoreIcon />
			</IconButton>
			</Toolbar>
		</AppBar>
		  )}
        </Toolbar>
      </AppBar>
    </Box>
	);
};

export default Navbar;
