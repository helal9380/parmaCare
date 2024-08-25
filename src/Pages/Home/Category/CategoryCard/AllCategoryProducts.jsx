/** @format */


import { FcViewDetails } from "react-icons/fc";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCarts from "../../../../Hooks/useCarts";

const AllCategoryProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const data = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  const [, refetch] = useCarts();
  console.log(data);

  const handleAdd = (item) => {
    if (user && user?.email) {
      const addItem = {
        name: item?.name,
        price: item?.price,
        image: item?.image,
        email: user?.email,
        quantity: 1,
        status: 'pending'
      };
      axiosSecure.post("/carts", addItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          // refecth here
        }
        refetch();
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
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
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
              {data?.map((item, index) => (
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
                      <div className="modal-box border-4 border-[#66BC89]">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle bg-[#66BC89] absolute right-2 top-2 text-white hover:text-[#66BC89]">
                            ✕
                          </button>
                        </form>
                        <div className="">
                          <img
                          className="w-full"
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
                    <button
                      onClick={() => handleAdd(item)}
                      className="btn btn-ghost bg-[#66BC89] text-white hover:bg-[#459866] btn-xs">
                      Add
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

export default AllCategoryProducts;
