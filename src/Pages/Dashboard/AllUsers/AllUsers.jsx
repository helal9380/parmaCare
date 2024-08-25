/** @format */

import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const AllUsers = () => {
  const axiosSecore = useAxiosSecure();

  const { data: users = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecore.get("/users");
      return res.data;
    },
  });

  const handleDelete = (user) => {
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
            if (res.data.message) {
              refetch();
              Swal.fire("Deleted!", "User has been deleted.", "success");
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to delete user.", err);
          });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosSecore.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.message) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now an admin.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }).catch((err) => {
      Swal.fire("Error!", "Failed to update user role.", err);
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users.</div>;
  }

  return (
    <div>
      <SectionTitle
        title={"All Users"}
        subTitle={"Welcome to all users page"}></SectionTitle>
      
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No..</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? "Admin" : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn text-[#66BC89] btn-sm"
                    >
                      <FaUser />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost text-red-600 btn-sm"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
