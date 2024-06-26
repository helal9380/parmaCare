/** @format */
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PU5z401FLseERyAyq4Ui6rjDIfnKFhwfhStSvzqub39wcxsdaMrwFeTeB2aqQTj0nQPZdmvt3jmO8rG6yDHgXtI00Gu91pYpJ');

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  // const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { data: clientSecret } = await axios.post('/create-payment-intent', {
      amount: totalAmount * 100, // amount in cents
    });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setLoading(false);
        history.push('/invoice');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

const Checkout = ({ totalAmount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
};

export default Checkout;
