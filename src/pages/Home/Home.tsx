"use client";

// import { addHotel } from '@/redux/states';
import React from 'react';
// import { useDispatch } from 'react-redux';
import Layout from '../../layouts/Layout';
import { LayoutContainer } from '../../styled-components';
import { BannerHome } from './components/BannerHome';
import { HotelList } from './components/HotelList';
import { BookingForm } from './components/BookingForm';


export type HomeProps = {

}

const Home: React.FC<HomeProps>  = () => {
	// const dispatch = useDispatch();
	//   useEffect(()=> {
	// 		dispatch(addHotel(Hotel));
	// 	});

	return (
		<Layout>
			<BannerHome/>
			<LayoutContainer>  
				<div style={{ width: '100%' }}>
					<HotelList/>
					<BookingForm/>
				</div>
			</LayoutContainer>
		 </Layout>
	);
};

export default Home;
