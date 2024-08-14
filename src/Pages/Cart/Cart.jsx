/** @format */
import useCarts from "../../Hooks/useCarts";
import axios from "axios";
import { Link } from "react-router-dom";
// import { FaCross } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart,refecth] = useCarts();
  const axiosSecure = useAxiosSecure()

  const updateQuantity = async (id, quantity, isIncrement) => {
    const newQuantity = isIncrement ? quantity + 1 : quantity - 1;

    if (newQuantity < 1) return;

    try {
      const res = await axios.put(`http://localhost:5000/carts/${id}`, {
        quantity: newQuantity,
        
      });

      if (res.data.modifiedCount > 0) {
        refecth()
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };


  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async(result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/cart/${item._id}`);
        console.log(res.data);
        if(res.data.deletedCount > 0) {
          Swal.fire({
          title: `${item?.name} has been deleted!`,
          text: "Your medicine has been deleted.",
          icon: "success"
        });
          refecth()
        }
      }
    });
    
  }
  // clear all here

  const handleClearAll = async() => {
    const res = await axiosSecure.delete('/carts');
    console.log(res.data);
    refecth()
  }
  return (
    <div>
      <div className="max-w-screen-md mx-auto border-2 border-[#66BC89] p-5">
        <div className="flex justify-between my-5 items-center">
        <h3 className="text-center text-3xl font-semibold">
          All Carts {cart.length}
        </h3>
        {cart.length ? <Link to={'/dashboard/checkout'} className="btn hover:bg-[#53936d] btn-sm text-white font-semibold bg-[#66BC89]">Checkout</Link> : <Link to={'/dashboard/checkout'}><button className="btn btn-sm">Checkout</button></Link>}
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
                  <th>Action</th>
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
                    <td>${item.price}</td>
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
                      <h3>${item.price  * item.quantity}</h3>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item)} className="btn btn-sm bg-red-400 hover:bg-red-500 text-white">
                      <RxCross2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
            <div className="flex justify-end">
              <button disabled={!cart.length} onClick={handleClearAll} className="btn btn-sm bg-[#66BC89] text-white font-semibold hover:bg-[#4f966c]">Clear All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
