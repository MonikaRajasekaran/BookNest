import React, { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import HeaderGuest from '@/components/headerGuest'; // Import your guest component
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles

function Header({ details }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    where: '',
    checkIn: '',
    checkOut: '',
    guests: '', // This will hold guest details
  });

  const [showLocationModal, setShowLocationModal] = useState(false); // Modal state

  const router = useRouter();

  const debouncedSetSearchTerm = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 1000),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'where') {
      debouncedSetSearchTerm(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleGuestChange = (guests) => {
    const guestSummary = [
      guests.adult > 0 ? `${guests.adult} Adults` : '',    // Show only if adult count is greater than 0
      guests.child > 0 ? `${guests.child} Children` : '',  // Show only if child count is greater than 0
      guests.infant > 0 ? `${guests.infant} Infants` : '',  // Show only if infant count is greater than 0
    ]
      .filter(Boolean)   // Remove empty strings from the array
      .join(',');        // Join remaining non-empty terms with commas

    setFormData((prev) => ({
      ...prev,
      guests: guestSummary,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      checkIn: formData.checkIn ? moment(formData.checkIn).format('YYYY-MM-DD') : '',
      checkOut: formData.checkOut ? moment(formData.checkOut).format('YYYY-MM-DD') : '',
    };

    router.push({
      pathname: '/search',
      query: formattedData,
    });
  };

  return (
    <header className="bg-white p-6 border-b ">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 	">
        
        {/* Logo */}
        <div className="text-lg font-bold mb-4 sm:mb-0 sm:ml-8">
          Higglers
        </div>

        {/* Search Form */}
        <div className="w-full sm:w-auto">
          <form
            onSubmit={handleSubmit}
            
            className="search-form flex    items-center border rounded-full px-4 py-2 space-y-2 sm:space-y-0 sm:space-x-2 shadow-md"
          >
            {/* Location input */}
           <div className='text-center'>
           <input
              type="text"
              name="where"
              placeholder="Where"
              value={formData.where}
              onChange={handleChange}
              className="search-input border-none p-2 rounded-md focus:outline-none focus:ring-0 w-full "
            />
           </div>

            {/* Divider */}
            <span className="hidden sm:inline-block border-l h-6"></span>

            {/* Check-in Date */}
            <DatePicker
              selected={formData.checkIn}
              onChange={(date) => handleDateChange('checkIn', date)}
              selectsStart
              startDate={formData.checkIn}
              endDate={formData.checkOut}
              placeholderText="Check-in"
              className="text-gray-600  font-medium focus:outline-none w-full sm:w-auto"
              />

            {/* Divider */}
            <span className="hidden sm:inline-block border-l h-6"></span>

            {/* Check-out Date */}
            <DatePicker
              selected={formData.checkOut}
              onChange={(date) => handleDateChange('checkOut', date)}
              selectsEnd
              startDate={formData.checkIn}
              endDate={formData.checkOut}
              minDate={formData.checkIn}
              placeholderText="Check-out"
              className="text-gray-600  font-medium focus:outline-none w-full sm:w-auto"
              />

            {/* Divider */}
            <span className="hidden sm:inline-block border-l h-6"></span>

            {/* Guests */}
            <HeaderGuest onGuestChange={handleGuestChange} guestCount={formData.guests} />

            {/* Search Button */}
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded-full focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Sign In */}
        <div className="mt-4 sm:mt-0 sm:mr-8">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

