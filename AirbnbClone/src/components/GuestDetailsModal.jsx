import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setCount } from '@/features/guestSlice';

const GuestDetailsDropdown = ({ isOpen, onClose, guest, onGuestChange }) => {
  const dispatch = useDispatch();
  const [adults, setAdults] = useState(guest.minAdults);
  const [children, setChildren] = useState(guest.minChildren);
  const [infants, setInfants] = useState(guest.minInfants);

  const { checkInDate, checkOutDate } = useSelector((state) => state.date);
  const { adult, child, infant } = useSelector((state) => state.guest);

  useEffect(() => {
    dispatch(setCount({ adult: adults, child: children, infant: infants }));
    onGuestChange({ adult: adults, child: children, infant: infants });
    // Dispatch the updated counts after the state has been updated
  }, [adults, children, infants, dispatch]);

  if (!isOpen) return null;

  const handleIncrement = (setter, value, max) => {
    setter((prev) => Math.min(prev + value, max));
    dispatch(setCount({ adult: adults, child: children, infant: infants }));

  };

  const handleDecrement = (setter, value, min) => {
    setter((prev) => Math.max(prev - value, min));
    dispatch(setCount({ adult: adults, child: children, infant: infants }));

  };

  return (
    <div className="absolute bg-white border rounded shadow-lg p-4 w-full max-w-xs z-50">
      <h2 className="text-xl font-bold mb-4">Guest Details</h2>

      <div className="flex items-center mb-4">
        <div className="flex flex-col mr-4">
          <p className="mb-0"><strong>Adult:</strong></p>
          <p className="mb-0 text-sm	">Age: 13+</p>
        </div>
        <div className="flex items-center">
          <button 
            onClick={() => handleDecrement(setAdults, 1, guest.minAdults)} 
            className="bg-gray-300 px-2 py-1 rounded"
          >
            -
          </button>
          <span className="mx-4">{adults}</span>
          <button 
            onClick={() => handleIncrement(setAdults, 1, guest.maxAdults)} 
            className="bg-gray-300 px-2 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex flex-col mr-4">
          <p className="mb-0"><strong>Children:</strong></p>
          <p className="mb-0 text-sm	">Ages 2–12</p>
        </div>
        <div className="flex items-center">
          <button 
            onClick={() => handleDecrement(setChildren, 1, guest.minChildren)} 
            className="bg-gray-300 px-2 py-1 rounded"
          >
            -
          </button>
          <span className="mx-4">{children}</span>
          <button 
            onClick={() => handleIncrement(setChildren, 1, guest.maxChildren)} 
            className="bg-gray-300 px-2 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex flex-col mr-4">
          <p className="mb-2"><strong>Infants:</strong></p>
          <p className="mb-0 text-sm	">Under 2</p>
        </div>
        <div className="flex items-center">
          <button 
            onClick={() => handleDecrement(setInfants, 1, guest.minInfants)} 
            className="bg-gray-300 px-2 py-1 rounded"
          >
            -
          </button>
          <span className="mx-4">{infants}</span>
          <button 
            onClick={() => handleIncrement(setInfants, 1, guest.maxInfants)} 
            className="bg-gray-300 px-2 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 ">
        {guest.petsAllowed ? "Pets are allowed." : "Pets aren't allowed."}
      </p>
      
      <button 
        onClick={onClose} 
        className="bg-blue-500 text-white item-center rounded "
      >
        Close
      </button>
    </div>
  );
};

GuestDetailsDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  guest: PropTypes.object.isRequired,
  onGuestChange: PropTypes.func.isRequired,
};

export default GuestDetailsDropdown;
