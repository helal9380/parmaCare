/** @format */

import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaPumpMedical } from "react-icons/fa6";

const imgeHostintKey = import.meta.env.VITE_IMAGE_HOSTING;
const imageHosting = `https://api.imgbb.com/1/upload?key=${imgeHostintKey}`
const AddItem = () => {
  const axiosPublic = useAxiosPublic()
  const axiosSecure =useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async(data) => {
    const menuItem = {
      name: data.name,
      category: data.category,
      price:parseFloat(data.price),
      details: data.details,
      image: data.imgUrl
    }
    const menuRes = await axiosSecure.post('/category', menuItem);
    if(menuRes.data.insertedId) {
      console.log('item set in the database', menuRes.data);
      reset()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.name} is add in the database`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    console.log(data)
  };
  return (
    <div>
    <div>
      <h2 className="text-xl font-semibold text-center">Add category of the medicine</h2>
    </div>
      <div className="max-w-screen-md mx-auto">
        <form
          className=""
          onSubmit={handleSubmit(onSubmit)}>
          <div className="label ">
            <span className="label-text text-xl font-semibold">Name</span>
          </div>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
          />

          <div className="flex gap-4">
            <div className="w-full">
              <div className="label w-full">
                <span className="text-xl font-semibold">Category</span>
              </div>
              <select
                {...register("category")}
                className="select w-full border select-primary">
                <option
                  disabled
                  selected>
                  Select a category
                </option>
                <option value="salad">Pain Relief</option>
                <option value="pizza">Antibiotics</option>
                <option value="dessert">Cold and Flu</option>
                <option value="driks">Allergy</option>
                <option value="driks">Antidote</option>
                <option value="driks">Barbiturates</option>
              </select>
            </div>
            <div className="w-full">
              <div className="">
                <span className=" label text-xl font-semibold">Price</span>
              </div>
              <input
                {...register("price")}
                type="text"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <textarea {...register('details')} className="textarea w-full my-5 textarea-bordered" placeholder="details..."></textarea>
          <div>
          <input {...register('imgUrl')} type="text" placeholder="img url" className="input input-bordered w-full" />
          </div>
          <button className="btn mt-5">Add Category <FaPumpMedical></FaPumpMedical></button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
