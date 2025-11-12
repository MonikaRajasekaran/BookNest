import React, { useState, useEffect } from 'react';
import _, { update } from 'lodash';
import MultiRangeCalendar from '@/components/calender';
import GuestDetailsDropdown from '@/components/GuestDetailsModal';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { setDates } from '../features/dateSlice'; // Adjust import path
import { useRouter } from 'next/router';

function RoomDetails({ details }) {
  const dispatch = useDispatch();
  const { checkInDate, checkOutDate } = useSelector((state) => state.date);
  const { adult, child, infant } = useSelector((state) => state.guest);
console.log(checkInDate,checkOutDate);
  const [guests, setGuests] = useState({ adult, child, infant }); // State to store guests
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price
  const [nights, setNights] = useState(0); // State to store total nights

  const router = useRouter();

  const perNightPrice = 1450; // Example per-night price (you can make it dynamic based on details)
  const serviceFee = 9902; // Example service fee (can be dynamic as well)
  const today = moment().format('YYYY-MM-DD');

  const checkInDateMoment = checkInDate ? moment(checkInDate) : null;
  const checkOutDateMoment = checkOutDate ? moment(checkOutDate) : null;

  // Function to calculate total price based on check-in and check-out dates
  const calculateTotalPrice = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const checkInMoment = moment(checkIn);
      const checkOutMoment = moment(checkOut);
      const nights = checkOutMoment.diff(checkInMoment, 'days', true); // True to get fractional nights
      console.log(nights)
      // Ensure at least 1 night is counted
      const totalNights = Math.max(Math.ceil(nights), 1);
      
      setNights(totalNights); // Update the state for total nights
      return totalNights * perNightPrice; // Multiply nights by the per-night price
    }
    return 0; // Return 0 if no dates are selected
  };
  

  // Function to handle date change (check-in or check-out)
  const handleDateChange = (field, value) => {
    let updatedCheckInDate = checkInDateMoment;
    let updatedCheckOutDate = checkOutDateMoment;

    if (field === 'checkInDate') {
      updatedCheckInDate = moment(value);
      if (updatedCheckOutDate && updatedCheckInDate.isAfter(updatedCheckOutDate)) {
        updatedCheckOutDate = updatedCheckInDate;
      }
    } else if (field === 'checkOutDate') {
      updatedCheckOutDate = moment(value);
      if (updatedCheckInDate && updatedCheckOutDate.isBefore(updatedCheckInDate)) {
        updatedCheckInDate = updatedCheckOutDate;
      }
    }

    dispatch(setDates({
      checkInDate: updatedCheckInDate ? updatedCheckInDate.format('YYYY-MM-DD') : null,
      checkOutDate: updatedCheckOutDate ? updatedCheckOutDate.format('YYYY-MM-DD') : null,
    }));

    // Update the total price after setting new dates
    const newTotalPrice = calculateTotalPrice(updatedCheckInDate, updatedCheckOutDate);
    setTotalPrice(newTotalPrice);
  };

  // Update the total price when dates change
  useEffect(() => {

    if (checkInDate && checkOutDate) {
      const newTotalPrice = calculateTotalPrice(checkInDate, checkOutDate);
      setTotalPrice(newTotalPrice);
      setGuests({adult:1,child:0,infant:0})

    } else {
      dispatch(setDates({
        checkInDate: new Date(),
        checkOutDate: new Date(),

      }));
      console.log(adult)

      const currentDate =  calculateTotalPrice(new Date(), new Date())
      setTotalPrice(currentDate); // or any default value you prefer
      setGuests({ adult: 1, child: 0, infant: 0 }); // or any default values
    }

  }, [checkInDate, checkOutDate,dispatch]);

  // Function to handle guest change
  const handleGuestChange = (updatedGuests) => {
    setGuests(updatedGuests);
  };

  // Function to handle the reservation process
  const handleReserve = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates before reserving.");
      return;
    }
    const data = {
      id: details.id,
      title: details.title,
      checkInDate,
      checkOutDate,
      ...guests,
      totalPrice,
      nights,
      perNightPrice,
      serviceFee,
    };
    router.push({
      pathname: '/booking',
      query: data,
    });
  };

  return (
    <div className="container mx-auto  p-14">
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Content */}
        <div className="left-content  w-full md:w-2/3 pr-10 overflow-auto leading-relaxed
">
          <h2 className="text-2xl font-bold mb-2">{details.title}</h2>
          <p className="text-2xl font-bold mb-2">Hosted By {details.host}</p>
          <h2 className="text-xl underline ">Accessibility features</h2>
          <p>{details.content}</p>

          {/* Amenities */}
          <div>
            <h3 className='text-xl underline mt-6'>What This Place Offers</h3>
            {details.amenities && details.amenities.length > 0 ? (
              <div className="flex">
                {_.chunk(details.amenities, Math.ceil(details.amenities.length / 2)).map(
                  (amenityRow, rowIndex) => (
                    <ul className="list-disc pl-5 w-1/2" key={rowIndex}>
                      {amenityRow.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            ) : (
              <p>No amenities available</p>
            )}
          </div>

          <MultiRangeCalendar />
        </div>

        {/* Right Side: Fixed Card */}
        <div className="right-content w-full md:w-1/3">
          <div className="sticky top-24 bg-white p-6 shadow-md border rounded-lg">
            <div className="mb-4">
              <span className="line-through text-gray-400">₹6,016</span>
              <span className="text-xl font-semibold">₹{perNightPrice}</span>
              <span>/ night</span>
            </div>

            {/* Check-in and Checkout */}
            <div className="mb-4">
              <label className="block text-gray-700">Check-in</label>
              <input
                type="date"
                min={today}
                value={checkInDateMoment ? checkInDateMoment.format('YYYY-MM-DD') : today}
                onChange={(e) => handleDateChange('checkInDate', e.target.value)}
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Checkout</label>
              <input
                type="date"
                min={today}
                value={checkOutDateMoment ? checkOutDateMoment.format('YYYY-MM-DD') : today}
                onChange={(e) => handleDateChange('checkOutDate', e.target.value)}
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            {/* Guests Dropdown */}
            <div className="mb-4 relative">
              <label className="block text-gray-700">Guests</label>
              <p
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="border rounded px-4 py-2 w-full h-10 cursor-pointer"
              >
                {adult ? `${adult} Adults` : ''} {child ? `- ${child} Children` : ''}{' '}
                {infant ? `- ${infant} Infants` : ''}
              </p>

              <GuestDetailsDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                guest={details.guestDetails}
                onGuestChange={handleGuestChange}
              />
            </div>

            {/* Reservation Button */}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded w-full"
              onClick={handleReserve}
            >
              Reserve
            </button>

            {/* Price Breakdown */}
            <div className="flex justify-between m-2">
              <p className="underline text-xl">
                {`₹${perNightPrice} x ${nights} nights`}
              </p>
              <p className="text-xl">Total: ₹{totalPrice}</p>
            </div>
            <div className="flex justify-between m-2">
              <p className="text-xl">Airbnb service fee</p>
              <p className="text-xl">₹{serviceFee}</p>
            </div>
            <div className="flex justify-between m-2">
              <p className="text-xl">Total (INR)</p>
              <p className="text-xl">
                ₹{parseInt(totalPrice) + parseInt(serviceFee)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className='mt-6 text-2xl bold'>Where you’ll be</h2>
        <p className='text-lg mb-10'>{details.city}, {details.country}</p>
        <iframe
          src={details.location}
          width="100%"
          height="450"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        />
      </div>
    </div>
  );
}

export default RoomDetails;
