import React, { useState, useCallback, useEffect } from 'react';
import ButtonIcon from '../../components/button';
import OwlCarousel from '../../components/carousel';
import { listings } from '../../../public/data/listing'; // Assuming listings is just a static array
import 'react-datepicker/dist/react-datepicker.css';
import Header from '@/components/header';
import debounce from 'lodash/debounce'; // Still loving lodash 😎
import Footer from '@/components/footer';
import Structure from '@/layout/basic';
import Carousel from '../../components/carousel';
import CategorySlider from '@/components/CategorySlider';
export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false); // To track if we are on the client

  const debouncedSetSearchTerm = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 1000),
    []
  );

  const handleChange = (e) => {
    console.log(e.target.value);
    debouncedSetSearchTerm(e.target.value);
  };

  const filteredListings = listings.filter(listing =>
    listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||  
    listing.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setIsClient(true); // Set to true when component is mounted
  }, []);

  return (
    <Structure>
      <div className="min-h-screen p-2-sm bg-gray-50">
        {/* Category Navigation */}
        <div className="bg-white py-4 border-b mt-2">
          <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-auto">
            <ButtonIcon />
          </div>
        </div>

        {/* Listings */}
        <div className="listing max-w-7xl mx-auto ">
          <div className='md:p-6 p-2 flex gap-4 items-center flex-col-sm'>
            <h2 className="text-xl font-bold">Popular Listings</h2>
            <input
              type="text"
              placeholder="Search city or country"
              onChange={handleChange}
              className="border  rounded-md p-2"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:p-4">
           
              <Carousel listing={filteredListings.length > 0 ? filteredListings : []} />
            
          </div>

          <div className="pt-10">
      {/* <h2 className="text-3xl font-bold text-center mb-8">Top Sellers</h2> */}
      <CategorySlider products={filteredListings} mycategory={"Rooms"} />

    </div>
        </div>
      </div>
    </Structure>
  );
}
