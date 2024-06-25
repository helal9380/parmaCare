/** @format */

import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Shop = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await axiosPublic.get("/products");
      setProducts(res.data);
    };
    getData();
  }, [axiosPublic]);
  console.log(products);
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
                    <button className="btn btn-ghost btn-xs">details</button>
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
