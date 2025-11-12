import React from "react";

const FilteredListings = ({ listings, searchTerm }) => {
  const filteredListings = listings.filter(listing =>
    listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||  
    listing.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return FilteredListings
 
};

export default FilteredListings;
