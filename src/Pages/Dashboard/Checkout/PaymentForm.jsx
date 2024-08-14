/** @format */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCarts from "../../../Hooks/useCarts";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const [cart, refetch] = useCarts();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (totalPrice) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
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
      console.log("confirm error", confirmError);
      setError(confirmError.message);
    } else {
      if(paymentIntent.status === "succeeded") {
        const payment = {
          medicineName: cart?.name,
          userEmail: user?.email,
          userName: user.displayName,
          transactionId: paymentIntent.id,
          price: totalPrice,
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          menuTds: cart.map((item) => item.menuId),
          productName: cart.map((item) => item?.name),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        if (res.data?.paymentResult?.insertedId) {
          refetch();
          
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your payment successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate('/dashboard/invoice')
      }
    }
  };
  // console.log(cart);
  return (
    <div>
      <form onSubmit={handlePayment}>
        <CardElement />
        <div className="flex justify-between">
          <div></div>
          <button
            disabled={!stripe || !clientSecret || totalPrice < 1}
            className="btn btn-sm bg-[#66BC89] text-white mt-2 hover:bg-[#45805c]">
            Pay ${totalPrice}
          </button>
        </div>
        <p className="text-red-500">{error}</p>
      </form>
    </div>
  );
};

export default PaymentForm;
