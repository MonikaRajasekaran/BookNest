import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/model'; // Adjust the path as necessary

const HeaderGuest = ({ onClose, onGuestChange }) => {
  const [adult, setAdults] = useState(0);
  const [child, setChildren] = useState(0);
  const [infant, setInfants] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleIncrement = (setter, value, max) => (event) => {
    event.preventDefault();
    setter((prev) => {
      const updatedValue = Math.min(prev + value, max);
      updateGuests(updatedValue, setter);
      return updatedValue;
    });
  };
  
  const handleDecrement = (setter, value, min) => (event) => {
    event.preventDefault();
    setter((prev) => {
      const updatedValue = Math.max(prev - value, min);
      updateGuests(updatedValue, setter);
      return updatedValue;
    });
  };

  const updateGuests = (value, setter) => {
    // Call the parent callback function with updated values
    onGuestChange({
      adult: setter === setAdults ? value : adult,
      child: setter === setChildren ? value : child,
      infant: setter === setInfants ? value : infant,
    });
  };

  return (
    <div className="relative">
      <p
        onClick={() => setIsModalOpen(true)}
        className="  px-4 py-2 w-full cursor-pointer text-slate-400"
      >
       {(adult > 0 || child > 0 || infant > 0) ? (
  `${adult > 0 ? `${adult} Adults` : ""}${child > 0 ? ` - ${child} Child` : ""}${infant > 0 ? ` - ${infant} Infant` : ""}`
) : "Add Guest"}
      </p>

      {isModalOpen && (
        <div className="absolute top-full right-2  mt-2 z-10">
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div>
              <div className="flex items-center mb-4">
                <div className="flex flex-col mr-4">
                  <p className="mb-0"><strong>Adult:</strong></p>
                  <p className="mb-0">Age: 13+</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(event) => handleDecrement(setAdults, 1, 0)(event)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-4">{adult}</span>
                  <button
                    onClick={(event) => handleIncrement(setAdults, 1, 10)(event)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex flex-col mr-4">
                  <p className="mb-0"><strong>Children:</strong></p>
                  <p className="mb-0">Ages 2–12</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(event) => handleDecrement(setChildren, 1, 0)(event)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-4">{child}</span>
                  <button
                    onClick={(event) => handleIncrement(setChildren, 1, 10)(event)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex flex-col mr-4">
                  <p className="mb-2"><strong>Infants:</strong></p>
                  <p className="mb-0">Under 2</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(event) => handleDecrement(setInfants, 1, 0)(event)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-4">{infant}</span>
                  <button
                    onClick={(event) => handleIncrement(setInfants, 1, 5)(event)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

HeaderGuest.propTypes = {
  onClose: PropTypes.func.isRequired,
  onGuestChange: PropTypes.func.isRequired, // Add prop validation for the callback function
};

export default HeaderGuest;
