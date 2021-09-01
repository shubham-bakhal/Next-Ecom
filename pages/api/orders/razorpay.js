import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';
const shortid = require('shortid');
const Razorpay = require('razorpay');

const handler = nc({
  onError,
});

handler.use(isAuth);

const razorpay = new Razorpay({
  key_id: process.env.RAZPRPAY_ID,
  key_secret: process.env.RAZPRPAY_SECRET,
});

handler.post(async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = 'INR';

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: 'Something went wrong' });
  }
});

export default handler;
