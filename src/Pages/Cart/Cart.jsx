/** @format */

import { useState } from "react";
import useCarts from "../../Hooks/useCarts";
import axios from "axios"; // Assuming axios is used for HTTP requests
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart,refecth, setCart] = useCarts();

  const updateQuantity = async (id, quantity, isIncrement) => {
    const newQuantity = isIncrement ? quantity + 1 : quantity - 1;

    if (newQuantity < 1) return; // Prevent quantity from being less than 1

    try {
      const res = await axios.put(`https://parma-care-client.vercel.app/carts/${id}`, {
        quantity: newQuantity,
        
      });

      if (res.data.modifiedCount > 0) {
        refecth()
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };
  const parsePrice = (priceString) => {
    // Remove the dollar sign and convert to a number
    return parseFloat(priceString.replace("$", ""));
  };
  return (
    <div>
      <div className="max-w-screen-md mx-auto border-2 border-[#66BC89] p-5">
        <div className="flex justify-between my-5 items-center">
        <h3 className="text-center text-3xl font-semibold">
          All Carts {cart.length}
        </h3>
        <Link to={'/dashboard/checkout'} className="btn hover:bg-[#53936d] btn-sm text-white font-semibold bg-[#66BC89]">Checkout</Link>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cart.map((item) => (
                  <tr key={item?._id}>
                    <th>
                      <div className="flex items-center gap-4">
                        <div className="w-1/2">
                          <img className="rounded-lg" src={item.image} alt="" />
                        </div>
                        <div className="space-y-2">
                          <h3>
                            <span className="font-semibold">Name: </span>
                            {item.name}
                          </h3>
                          <h3>
                            <span className="font-semibold">
                              Buyer Email:{" "}
                            </span>
                            {item.email}
                          </h3>
                        </div>
                      </div>
                    </th>
                    <td>{item.price}</td>
                    <td>
                      <div className="flex gap-2 items-center">
                        <button
                          className="btn btn-sm bg-[#66BC89] text-white font-semibold text-xl hover:bg-[#54906c]"
                          onClick={() =>
                            updateQuantity(item._id, item?.quantity, false)
                          }
                          disabled={item?.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item?.quantity}</span>
                        <button
                          className="btn btn-sm bg-[#66BC89] text-white font-semibold text-xl hover:bg-[#54906c]"
                          onClick={() =>
                            updateQuantity(item._id, item?.quantity, true)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <h3>{parsePrice(item.price)  * Number(item?.quantity)}</h3>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
