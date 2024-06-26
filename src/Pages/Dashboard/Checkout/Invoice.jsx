/** @format */
import React from 'react';
import { useLocation } from 'react-router-dom';

const Invoice = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div>
      <h1>Invoice</h1>
      <p>Thank you for your purchase!</p>
      <p>Transaction ID: {state?.transactionId}</p>
      <p>Amount Paid: ${state?.amountPaid}</p>
    </div>
  );
};

export default Invoice;
