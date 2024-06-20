/** @format */

import { useForm } from "react-hook-form";

import { FaUtensils } from "react-icons/fa";



import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const imgeHostintKey = import.meta.env.VITE_IMAGE_HOSTING;
const imageHosting = `https://api.imgbb.com/1/upload?key=${imgeHostintKey}`
const AddItem = () => {
  const axiosPublic = useAxiosPublic()
  const axiosSecure =useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async(data) => {
    const imageFile = {image: data.image[0]}
   const res = await axiosPublic.post(imageHosting, imageFile, {
    headers: {
      'Content-Type' : 'multipart/form-data'
    }
   });
   if(res.data.success) {

    const menuItem = {
      name: data.name,
      category: data.category,
      price:parseFloat(data.price),
      recipe: data.recipe,
      image: res.data.data.display_url
    }
    const menuRes = await axiosSecure.post('/menu', menuItem);
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
   }
   console.log(res.data);
    console.log(data)
  };
  return (
    <div>
      <SectionTitle
        heading="---What's new?---"
        subHeading="ADD AN ITEM"></SectionTitle>
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
            placeholder="Food Name"
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
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="dessert">Dessert</option>
                <option value="driks">Drinks</option>
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
          <textarea {...register('recipe')} className="textarea w-full my-5 textarea-bordered" placeholder="Food details..."></textarea>
          <div>
          <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
          </div>
          <button className="btn">Add item <FaUtensils></FaUtensils></button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
