/** @format */

import { useQuery } from "@tanstack/react-query";

import { FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecore = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: "users",
    queryFn: async () => {
      const res = await axiosSecore.get("/users");
      console.log(res.data);
      return res.data;
    },
  });
  console.log(users);
  const handlDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecore
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
                refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });

        //
      }
    });
  };
  const handlMakeAdmin = (user) => {
    axiosSecore.patch(`/users/admin/${user._id}`)
    .then(res => {
        if(res.data.modifiedCount > 0 ) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is admin now`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
  }
  return (
    <div>
      <div className="flex justify-evenly text-2xl font-semibold">
        <h2>All User</h2>
        <h2>Total User {users.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user,index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    { user.role === 'admin' ? 'Admin' : <button
                      onClick={() => handlMakeAdmin(user)}
                      className="btn bg-orange-300 text-red-600 btn-md">
                      <FaUser></FaUser>
                    </button>}
                    </td>
                  <td><button
                      onClick={() => handlDelete(user)}
                      className="btn btn-ghost text-red-600 btn-md">
                      <FiDelete></FiDelete>
                    </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
