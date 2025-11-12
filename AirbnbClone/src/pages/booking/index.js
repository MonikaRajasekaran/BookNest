import Header from '@/components/header';
import React, { useState } from 'react';
import RoomDetails from '@/components/RoomDetails';
import BookingCard from '@/components/bookingCard';
import { useRouter } from 'next/router';
import { listings } from '@@/data/listing';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { setPayment } from '@/features/paymentSlice';

const Modal = ({ isOpen, onClose, onSubmit, totalFees }) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(customerDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={customerDetails.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={customerDetails.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact:</label>
            <input
              type="text"
              name="contact"
              value={customerDetails.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your contact number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
            <input
              type="text"
              value={totalFees} // Assuming totalFees is passed as a prop
              className="w-full px-3 py-2 border rounded-lg"
              readOnly
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Pay Now
          </button>
        </form>
        <button className='w-full bg-red-500 text-white font-bold mt-2 py-2 px-4 rounded-lg' onClick={onClose}>Close</button>
    
      </div>
    </div>
  );
};

function BookingDetails({ details }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, title, checkInDate, checkOutDate, adult, child, infant, nights, perNightPrice, totalPrice } = router.query;

  const packageList = listings.find((item) => item.id == id);
  if (!packageList) {
    return <p>Package not found</p>;
  }

  const serviceFee = 3397; // Static service fee
  const cleaningFee = 1000; // Static cleaning fee
  const taxes = 9828; // Static taxes
  const totalWithFees = parseInt(totalPrice) + serviceFee + cleaningFee + taxes;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePayment = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleModalSubmit = (customerDetails) => {
    dispatch(setPayment({
      roomID: id,
      bookingId: Math.floor(100000 + Math.random() * 900000), // Random booking ID
      totalFees: totalWithFees,
      customerDetails,
    }));
    router.push('/payment');
  };

  return (
    <>
      <header className="bg-white p-8 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">Booking</div>
        </div>
      </header>

      <div className="container mx-auto mt-10">
        <div className="flex">
          <div className="left-content w-2/3 pr-10 overflow-auto">
            <div className='border-b'>
              <h2 className="text-3xl font-bold mb-4">Confirm and pay</h2>
              <p className="text-2xl font-bold mb-2">Your Trip</p>
              <p className="text-lg mt-4">Dates</p>
              <p className="text-base mb-4">{checkInDate}-{checkOutDate}</p>
              <p className="text-lg mt-6">Guest</p>
              <p className="text-base mb-4">{adult} adult, {child} child, {infant} infant</p>
            </div>
            
            <form className="space-y-4">
      {/* Country/Region Dropdown */}
    <h2 className="text-2xl font-bold mb-4 text-left p-4">Welcome to Higglers</h2>

      <div>
        <select name="country" className="w-full border p-2 rounded-md">
          <option value="+91">India (+91)</option>
          <option value="+1">USA (+1)</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Phone Number Input */}
      <div>
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Continue Button */}
      <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded-md text-center font-semibold">
        Continue
      </button>

      {/* Or separator */}
      <div className="text-center text-gray-500 my-4">or</div>

      {/* Social Buttons */}
      <button className="w-full border flex items-center justify-center p-2 rounded-md mb-2">
        <span>Continue with Facebook</span>
      </button>
      <button className="w-full border flex items-center justify-center p-2 rounded-md mb-2">
        <span>Continue with Google</span>
      </button>
    
    </form>
            
          </div>

          <div className="right-content w-1/2">
            <div className="sticky top-24 bg-white p-6 shadow-md border rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Price details</h2>
              <div className='flex gap-4 border-b p-4'>
                <div>
                  <Image
                    src={packageList.images[0]}
                    alt="Main Image"
                    width={150}
                    height={150}
                    layout="intrinsic"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold mb-2">{title}</h2>
                  <p className="text-sm font-bold mb-2">{packageList.host}</p>
                  <p className="text-sm font-bold">{packageList.city}</p>
                  <div className="rating-and-reviews flex items-center mb-2">
                    <span className="text-lg text-gray-600">4.98 (234 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xl border-b">
                <div className="flex justify-between p-2">
                  <p>{`₹${perNightPrice} x ${nights} nights`}</p>
                  <p>{`₹${totalPrice}`}</p>
                </div>
                <div className="flex justify-between p-2">
                  <p className='underline'>Total</p>
                  <p>{`₹${totalPrice}`}</p>
                </div>
                <div className="flex justify-between p-2">
                  <p className="underline">Service fee</p>
                  <p>{`₹${serviceFee}`}</p>
                </div>
                <div className="flex justify-between p-2">
                  <p className="underline">Cleaning fee</p>
                  <p>{`₹${cleaningFee}`}</p>
                </div>
                <div className="flex justify-between p-2">
                  <p className="underline">Taxes</p>
                  <p>{`₹${taxes}`}</p>
                </div>
              </div>

              <div className="mt-4 p-4 text-xl">
                <div className="flex justify-between">
                  <p>Total (INR)</p>
                  <p>{`₹${totalWithFees}`}</p>
                </div>
              </div>
              <button
              onClick={handlePayment}
              className="w-full bg-pink-500 text-white p-2 rounded-md text-center font-semibold"
            >
              Pay as guest
            </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        totalFees={totalWithFees}
      />
    </>
  );
}

export default BookingDetails;
