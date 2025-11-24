import Header from '@/components/header';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { listings } from '@@/data/listing';
import { useSelector, useDispatch } from 'react-redux';
import { setPayment } from '@/features/paymentSlice';


// ---------------- Modal ----------------
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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Complete your payment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'contact'].map((field) => (
            <div key={field}>
              <label className="text-gray-700 text-sm font-semibold capitalize">{field}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={customerDetails[field]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-pink-300"
                placeholder={`Enter your ${field}`}
                required
              />
            </div>
          ))}

          <div>
            <label className="text-gray-700 text-sm font-semibold">Amount</label>
            <input value={totalFees} readOnly className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100" />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold"
          >
            Pay Now
          </button>
        </form>

        <button
          className="w-full mt-3 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};


// ----------- MAIN BOOKING PAGE ----------
function BookingDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, title, checkInDate, checkOutDate, adult, child, infant, nights, perNightPrice, totalPrice } = router.query;

  const packageList = listings.find((item) => item.id == id);

  if (!packageList) return <p>Package not found</p>;

  const serviceFee = 3397;
  const cleaningFee = 1000;
  const taxes = 9828;
  const totalWithFees = parseInt(totalPrice) + serviceFee + cleaningFee + taxes;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalSubmit = (customerDetails) => {
    dispatch(setPayment({
      roomID: id,
      bookingId: Math.floor(100000 + Math.random() * 900000),
      totalFees: totalWithFees,
      customerDetails,
    }));
    router.push('/payment');
  };

  return (
    <>
      <Header />
<div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
  <h1 className="text-3xl font-bold mb-6">Confirm and pay</h1>

  {/* Updated Responsive Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

    {/* LEFT SIDE */}
    <div className="space-y-4">
      <div className="border-b pb-6">
        <h2 className="text-xl font-semibold">Your Trip</h2>

        <div className="mt-4">
          <p className="font-medium">Dates</p>
          <p className="text-gray-600">{checkInDate} → {checkOutDate}</p>
        </div>

        <div className="mt-4">
          <p className="font-medium">Guests</p>
          <p className="text-gray-600">{adult} adult · {child} child · {infant} infant</p>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE PRICE CARD */}
    <div className="lg:sticky lg:top-28 border shadow-md rounded-xl p-5">
      <div className="flex flex-col sm:flex-row gap-4 border-b pb-4">
        <div className="w-full sm:w-auto">
          <Image 
            src={packageList.images[0]} 
            width={120} 
            height={120} 
            className="w-full sm:w-[120px] h-auto sm:h-[120px] rounded-lg object-cover" 
            alt="Accommodation image" 
          />
        </div>

        <div className="w-full">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-500">{packageList.city}</p>
          <p className="text-gray-700 text-sm">⭐ 4.98 (234 reviews)</p>
        </div>
      </div>

      <div className="mt-4 divide-y text-sm text-gray-700">
        <div className="flex justify-between py-2">
          <span>{`₹${perNightPrice} x ${nights} nights`}</span>
          <strong>₹{totalPrice}</strong>
        </div>
        <div className="flex justify-between py-2">
          <span>Service fee</span>
          <span>₹{serviceFee}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Cleaning fee</span>
          <span>₹{cleaningFee}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Taxes</span>
          <span>₹{taxes}</span>
        </div>
      </div>

      <div className="flex justify-between text-lg font-bold mt-5">
        <span>Total (INR)</span>
        <span>₹{totalWithFees}</span>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold"
      >
        Proceed to Pay
      </button>
    </div>
  </div>
</div>


      {/* Payment Modal */}
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
