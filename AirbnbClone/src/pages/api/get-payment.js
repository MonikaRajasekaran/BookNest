// pages/api/get-payment.js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use environment variable
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Use environment variable
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentId } = req.body; // Expecting payment ID in request body

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }

    try {
      const paymentDetails = await razorpay.payments.fetch(paymentId);
      return res.status(200).json(paymentDetails);
    } catch (error) {
      console.error('Error fetching payment details:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
