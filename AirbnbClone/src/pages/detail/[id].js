import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '@/features/searchSlice'; // Adjust the path based on your folder structure
import { listings } from '@@/data/listing'; // Assuming you have listings data in this path
import ButtonIcon from '@/components/button';
import Structure from '@/layout/basic';
import Carousel from '@/components/carousel';

const CatergoryPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get category from the query params
  const dispatch = useDispatch();
console.log(id);
  // Access the filtered listings from Redux store
  const searchListings = useSelector((state) => state.search.listings);

  useEffect(() => {
    if (id) {
      // Filter listings based on the category
      
      const filteredListings = listings.filter(listing =>
        Array.isArray(listing.category) &&
        listing.category.some(categories =>
          categories.includes(id)
        )
      );
      // Dispatch filtered listings to the Redux store
      dispatch(setSearch(filteredListings));
    }
  }, [id, dispatch]);

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
            <Carousel listing={searchListings || []} />
          </div>
        </div>
      </div>
    </Structure>
  );
};

export default CatergoryPage;
