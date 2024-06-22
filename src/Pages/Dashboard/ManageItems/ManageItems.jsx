/** @format */

import { FiDelete } from "react-icons/fi";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageItems = () => {
  const [populer,setPopuler,] = useMenu();
console.log(populer);
  const axiosSecore = useAxiosSecure();
  const handleDelete = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecore.delete(`/menu/${item._id}`);
          if (res.status === 200) {
            // Update state or refetch menu data
            setPopuler(populer.filter((menuItem) => menuItem._id !== item._id));
            Swal.fire({
              title: "Deleted!",
              text: `${item.name} has been deleted.`,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Failed to delete item.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete item.",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <div>
      
    <div className="flex justify-between px-10 bg-[#66BC89] py-2 gap-5 mb-5 items-center">
    <h2 className="text-center uppercase text-white font-semibold">Manage Category : {populer.length}</h2>
      <button className="btn btn-sm bg-[#488460] text-white border-none hover:bg-[#66BC89]">
      <Link to={'/dashboard/addItem'}>Add medicine</Link>
      </button>
    </div>
    <div className="w-60 h-[4px] bg-[#66BC89] mx-auto mb-5"></div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No..</th>
                <th>Images</th>
         
                <th>Category</th>
                <th>medicine Count</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                        
              {populer?.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
             
                  <td>{item?.category}</td>
                  <td>{item?.medicineCount}</td>
                  <th>
                    <Link to={`update/${item._id}`} className="btn bg-[#66BC89] text-white btn-xs">Update</Link>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost text-red-600 btn-md">
                      <FiDelete></FiDelete>
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

export default ManageItems;
