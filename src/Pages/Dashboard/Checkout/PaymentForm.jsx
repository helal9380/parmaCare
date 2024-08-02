/** @format */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCarts from "../../../Hooks/useCarts";
import useAuth from "../../../Hooks/useAuth";

const PaymentForm = () => {
    const [error, setError] = useState("");
    const stripe = useStripe();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState("");
    const elements = useElements();
    const [cart] = useCarts();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();
  console.log(totalPrice);
    useEffect(() => {
      axiosSecure
        .post('/create-payment-intent', { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }, [axiosSecure, totalPrice]);
  
    const handlePayment = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
      const card = elements.getElement(CardElement);
  
      if (card === null) {
        return;
      }
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
  
      if (error) {
        console.log("[error]", error);
        setError(error.message);
        return;
      } else {
        console.log("[PaymentMethod]", paymentMethod);
        setError("");
      }
  
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });
  
      if (confirmError) {
        console.log('confirm error', confirmError);
        setError(confirmError.message);
      } else {
        console.log('payment intent', paymentIntent);
        setError("");
      }
    };
  
    return (
      <div>
        <form onSubmit={handlePayment}>
          <CardElement />
          <div className="flex justify-between">
            <div></div>
            <button
              disabled={!stripe || !clientSecret}
              className="btn btn-sm bg-[#66BC89] text-white mt-2 hover:bg-[#45805c]">
              Pay now
            </button>
          </div>
          <p className="text-red-500">{error}</p>
        </form>
      </div>
    );
  };
  

export default PaymentForm;
