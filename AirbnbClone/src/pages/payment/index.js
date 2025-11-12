import Header from '@/components/header';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import paymentlogo from '@@/images/paymentlogo.png';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Structure from '../../layout/basic';

const Payment = () => {
  const { roomID, bookingId, totalFees, customerDetails } = useSelector((state) => state.payment);
  const Router = useRouter();

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const amountInPaise = Math.round(totalFees * 100); 
  // Redirect if any of the required values are null
  useEffect(() => {
    if (!roomID || !bookingId || !totalFees || !customerDetails?.name || !customerDetails?.email || !customerDetails?.contact) {
      Router.push('/');
    }
  }, [roomID, bookingId, totalFees, customerDetails, Router]);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  // Trigger payment automatically when Razorpay is loaded and values are valid
  useEffect(() => {
    const triggerPayment = async () => {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      const order = await response.json();
      
      if (order.id) {
        const options = {
          key: 'rzp_test_v9ZaUEel7kp4bo', // Replace with your Razorpay Key ID
          amount: order.amount, // Amount in paise
          currency: 'INR',
          name: 'Your Company Name',
          description: 'Purchase Description',
          order_id: order.id, // Order ID created in your backend
          handler: function (response) {
            console.log('Payment successful:', response);
            // Optionally, you can navigate or do something after successful payment
          },
          prefill: {
            name: customerDetails.name,
            email: customerDetails.email,
            contact: customerDetails.contact,
          },
          theme: {
            color: '#F37254',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error('Failed to create order:', order);
      }
    };

    if (razorpayLoaded) {
      triggerPayment();
    }
  }, [razorpayLoaded, totalFees, customerDetails]);

  return (
    <Structure>
      <div className="max-w-lg mx-auto mt-4 p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-center items-center">
          <Image src={paymentlogo} alt="Payment Logo" className="w-32 h-auto" />
        </div>
      </div>
    </Structure>
  );
};

export default Payment;
