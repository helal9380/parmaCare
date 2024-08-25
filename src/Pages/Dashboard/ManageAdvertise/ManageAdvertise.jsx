/** @format */

import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageAdvertise = () => {
  const [medicines, setMedicines] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/products").then((res) => {
      const medicinesWithSlide = res.data.map((medicine) => ({
        ...medicine,
        inSlide: medicine.inSlide || false,
      }));
      setMedicines(medicinesWithSlide);
    });
  }, [axiosSecure]);

  const handleToggleSlide = (id, currentStatus) => {
    axiosSecure
      .patch(`/advertise/${id}`, { addToSlide: !currentStatus })
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          setMedicines(
            medicines.map((med) =>
              med._id === id ? { ...med, inSlide: !currentStatus } : med
            )
          );
        }
      });
  };
  console.log(medicines);
  return (
    <div>
      <SectionTitle
        title={"Manage Advertise"}
        subTitle={"Welcome to manage advertise page"}></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  No..
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {medicines.map((medicine, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={medicine.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </td>
                  <td>
                    {medicine.category}
                  </td>
                  <td>{medicine?.description}</td>
                  <td>
                    <button
                    className="btn btn-sm bg-[#66BC89] text-white hover:bg-[#46805d]"
                      onClick={() =>
                        handleToggleSlide(medicine._id, medicine.inSlide)
                      }>
                      {medicine.inSlide ? "Remove from Slide" : "Add to Slide"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAdvertise;
