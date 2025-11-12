import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import ButtonIcon from '@/components/button';
import { listings } from '@@/data/listing'; // Assuming you have listings data in this path
import Carousel from '@/components/carousel';
import { useDispatch,useSelector} from 'react-redux';
import { setSearch } from '@/features/searchSlice'; // Adjust the path based on your folder structure
import Structure from '@/layout/basic';

const SearchPage = () => {
  const router = useRouter();
  const { where, checkIn, checkOut, guests } = router.query;
  const dispatch = useDispatch();


 
 function searchData() {
   return useSelector((state) => state.search.listings)
 }
 
  
 

  let  searchListings = searchData();;
  
  useEffect(() => {
    if (router && where && checkIn && checkOut) {
   

      // Filter listings based on the "where" query parameter
      const filteredListings = listings.filter((listing) =>
        (
          listing.city.toLowerCase().includes(where.toLowerCase()) ||
          listing.country.toLowerCase().includes(where.toLowerCase())
        ) && 
        (
          !listing.bookedDate.includes(checkIn) && !listing.bookedDate.includes(checkOut)
        )
      );
      
      console.log(filteredListings);
      // Dispatch filtered listings to Redux store
      dispatch(setSearch(filteredListings));
    }
    console.log("****************",typeof(checkIn));

  }, [router.isReady, where, dispatch]);

  return (
    <Structure>
      <div className="min-h-screen p-2-sm bg-gray-50">
        {/* Category Navigation */}
        <div className="bg-white py-4 border-b mt-2">
          <div className="max-w-7xl mx-auto flex items-center space-x-6 overflow-auto">
            <ButtonIcon />
          </div>
        </div>

        {/* Listings */}
        <div className="max-w-7xl mx-auto py-8">
          <h2 className="text-xl font-bold mb-4">Popular Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Carousel listing={searchListings?searchListings:""} />
          </div>
        </div>
      </div>
    </Structure>
  );
};

export default SearchPage;
