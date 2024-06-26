/** @format */

import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { Link, Navigate } from "react-router-dom";
import useCarts from "../../Hooks/useCarts";
// import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Navigate } from "react-router-dom";

const Shop = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, refetch] = useCarts();
  const {user} = useAuth();

  useEffect(() => {
    const getData = async () => {
      const res = await axiosPublic.get("/products");
      setProducts(res.data);
    };
    getData();
  }, [axiosPublic]);

  const handleShopDetails = async (id) => {
    const res = await axiosPublic.get(`/shop/${id}`);
    setDetails(res.data);
  };

  const handleSearch = async () => {
    const res = await axiosPublic.get(`/products/search?query=${searchQuery}`);
    setProducts(res.data);
  };

  const handleAdd = (item) => {
    if (user && user?.email) {
      const addItem = {
        name: item?.name,
        price: item?.price,
        image: item?.image,
        email: user?.email,
        quantity: 1
      };
      axiosSecure.post("/carts", addItem).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
    
      });

    } else {
      Swal.fire({
        title: "You are not login",
        text: "please login to add cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="mt-[2px]">
      <div className="bg-[#66BC89] text-white py-5 rounded">
        <h3 className="text-3xl font-semibold text-center">Shop Now</h3>
        <div className="w-1/2 mx-auto flex gap-3 my-5">
          <input
            type="text"
            placeholder="Search.."
            className="input input-bordered w-full text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn"
            onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div>
        <div className="max-w-screen-lg mx-auto overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Images</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
                <th>Add to card</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="w-24 rounded">
                      <img
                        src={product.image}
                        alt="Product"
                      />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <th>
                    <a
                      onClick={() => handleShopDetails(product._id)}
                      href="#my_modal_8"
                      className="btn btn-ghost btn-xs">
                      Details
                    </a>
                    <div
                      className="modal"
                      role="dialog"
                      id="my_modal_8">
                      <div className="modal-box">
                        {details && (
                          <>
                            <img
                              src={details.image}
                              alt={details.name}
                            />
                            <h3 className="text-lg font-bold">
                              <span className="font-semibold">Name: </span>
                              {details.name}
                            </h3>
                            <h3 className="text-lg font-bold">
                              <span className="font-semibold">Category: </span>
                              {details.category}
                            </h3>
                            <h3 className="text-lg font-bold">
                              <span className="font-semibold">Price: </span>
                              {details.price}
                            </h3>
                          </>
                        )}
                        <p className="py-4">
                          This modal works with anchor links
                        </p>
                        <div className="modal-action">
                          <a
                            href="#"
                            className="btn">
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>
                    <button
                      onClick={() => handleAdd(product)}
                      className="btn btn-sm">
                      Add to card
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shop;
