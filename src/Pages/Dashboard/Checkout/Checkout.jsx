/** @format */

import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)
const Checkout = () => {
  return (
    <div>
      <SectionTitle
        title={"Payment Now"}
        subTitle={"Please payment now"}></SectionTitle>

        <div>
          <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
          </Elements>
        </div>
    </div>
  );
};

export default Checkout;
