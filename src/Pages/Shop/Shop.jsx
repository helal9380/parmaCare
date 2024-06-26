/** @format */

import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Shop = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState();
  const [details, setDetails] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await axiosPublic.get("/products");
      setProducts(res.data);
    };
    getData();
  }, [axiosPublic]);
  console.log(products);

  const handleShopDetails = async(id) => {
    console.log(id);
    const res = await axiosPublic.get(`/shop/${id}`);
    setDetails(res.data)
  }
  return (
    <div className="mt-[2px]">
      <div className="bg-[#66BC89] text-white py-5 rounded">
        <h3 className="text-3xl font-semibold text-center ">Shop Now</h3>
      </div>
      <div>
        <div className="max-w-screen-lg mx-auto overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Images</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {products?.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="w-24 rounded">
                      <img
                        src={product.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <th>
                    {/* The button to open modal */}
                    <a onClick={ () => handleShopDetails(product._id)}
                      href="#my_modal_8"
                      className="btn btn-ghost btn-xs">
                      Details
                    </a>

                    {/* Put this part before </body> tag */}
                    <div
                      className="modal"
                      role="dialog"
                      id="my_modal_8">
                      <div className="modal-box">
                        <img src={details?.image} alt="" />
                        <h3 className="text-lg font-bold"><span className="font-semibold">Name : </span>{details?.name}</h3>
                        <h3 className="text-lg font-bold"><span className="font-semibold">Category : </span>{details?.category}</h3>
                        <h3 className="text-lg font-bold"><span className="font-semibold">Price : </span>{details?.price}</h3>
                        <p className="py-4">
                          This modal works with anchor links
                        </p>
                        <div className="modal-action">
                          <a
                            href="#"
                            className="btn">
                            Cencel
                          </a>
                        </div>
                      </div>
                    </div>
                
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
