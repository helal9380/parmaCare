/** @format */

// src/pages/Checkout.jsx

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


import useCarts from "../../../Hooks/useCarts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);


const CheckoutForm = ({ totalAmount, cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const axiosSecure = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { items: cart })
      .then((res) => {
        if (res.data.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          console.error("Error: No client secret returned");
        }
      })
      .catch((err) => console.error(err));
  }, [axiosSecure, cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setError("Stripe has not loaded properly.");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log("Payment successful");
        window.location.href = "/invoice"; // Assuming you have an invoice page set up
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <button
        className="btn btn-sm bg-[#66BC89] text-white hover:bg-[#498260] mt-5"
        disabled={loading}
        type="submit"
      >
        Pay now ${totalAmount}
      </button>
    </form>
  );
};

const Checkout = () => {
  const [cart] = useCarts();
  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl text-center font-semibold">Payment</h2>
        <div className="w-12 h-[5px] bg-[#66BC89] mt-2 mx-auto"></div>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} cart={cart} />
      </Elements>
    </div>
  );
};

export default Checkout;
