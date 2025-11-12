// pages/api/create-order.js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: "rzp_test_v9ZaUEel7kp4bo", // Use environment variable
  key_secret: "hle0bWPfJEShCNp9ufQHIKXv", // Use environment variable
});

// RAZORPAY_KEY_ID="rzp_test_calheHXCf1668F"
// RAZORPAY_KEY_SECRET="yFjAyvHD9cZzUad3Ndv8UZ0Z"


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const options = {
      amount: req.body.amount, // Amount in paise
      currency: 'INR',
      receipt: 'receipt#1',
    };

    try {
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


