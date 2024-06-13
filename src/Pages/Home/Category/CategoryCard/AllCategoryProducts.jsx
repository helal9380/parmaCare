/** @format */

import { FaEye } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { useLoaderData } from "react-router-dom";

const AllCategoryProducts = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center my-5">All Medicine</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No..</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      className="w-14 h-14 rounded-full"
                      src={item?.image}
                      alt=""
                    />
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <th>
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                      className="btn bg-[#66BC89] text-white font-semibold btn-xs">
                      <FcViewDetails className="text-xl" />
                    </button>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}

                    <dialog
                      id="my_modal_3"
                      className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div className="w-1/2">
                          <img
                            src={item?.image}
                            alt=""
                          />
                        </div>
                        <div className="space-y-2 mt-2">
                          <h3 className="text-lg">
                            <span className="text-semibold">Name : </span>
                            {item?.name}
                          </h3>
                          <h3 className="text-lg">
                            <span className="font-semibold">Category : </span>
                            {item?.category}
                          </h3>
                          <h3 className="text-lg">
                            <span className="font-semibold">Price : </span>
                            {item?.price}
                          </h3>
                          <p className="text-lg">
                            <span className="font-semibold">
                              Description :{" "}
                            </span>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </dialog>
                  </th>
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

export default AllCategoryProducts;
