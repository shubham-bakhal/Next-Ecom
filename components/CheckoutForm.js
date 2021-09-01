import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';
import { useMemo } from 'react';
import axios from 'axios';
import { getError } from '../utils/error';
import { useSnackbar } from 'notistack';
import useStyles from '../utils/styles';

const useOptions = () => {
  const fontSize = '16px';
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const CheckoutForm = ({ paymentIntent, userInfo, dispatch, order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [checkoutError, setCheckoutError] = useState();
  const [checkoutSuccess, setCheckoutSuccess] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const stripeMethod = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      console.log(stripeMethod);

      if (stripeMethod.paymentIntent.error)
        throw new Error(stripeMethod.paymentIntent.error.message);

      if (
        stripeMethod.paymentIntent.status &&
        stripeMethod.paymentIntent.status === 'succeeded'
      ) {
        alert('success payment');
        const details = {
          id: stripeMethod.paymentIntent.id,
          status: stripeMethod.paymentIntent.status,
          email: userInfo.email,
        };
        onApprove(details);
        destroyCookie(null, 'paymentIntentId');
        setCheckoutSuccess(true);
      }
    } catch (err) {
      alert('payment faild');
      console.log(err);
      setCheckoutError(err.message);
    }
  };

  if (checkoutSuccess) return <p>Payment successfull!</p>;

  async function onApprove(details) {
    try {
      dispatch({ type: 'PAY_REQUEST' });
      const { data } = await axios.patch(
        `/api/orders/pay?id=${order._id}`,
        details,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'PAY_SUCCESS', payload: data });
      enqueueSnackbar('Order is paid', { variant: 'success' });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'PAY_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className={classes.label}>
        Card details
        <CardElement options={options} />
      </label>
      <button className={classes.Btn} type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
