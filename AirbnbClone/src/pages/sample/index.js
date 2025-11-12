// import React, { useState, useCallback, useEffect } from 'react';
// import ButtonIcon from '../components/button';
// import OwlCarousel from '../components/carousel';
// import { listings } from '../../public/data/listing'; // Assuming listings is just a static array
// import 'react-datepicker/dist/react-datepicker.css';
// import Header from '@/components/header';
// import debounce from 'lodash/debounce'; // Still loving lodash 😎
// import Footer from '@/components/footer';
// import Structure from '@/layout/basic';
// import Carousel from '../components/carousel';
// import CategorySlider from '@/components/CategorySlider';
// export default function index() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isClient, setIsClient] = useState(false); // To track if we are on the client

//   const filteredListings = listings.filter(listing =>
//     listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||  
//     listing.country.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <CategorySlider products={filteredListings} mycategory={"Rooms"} />
//   )
// }

