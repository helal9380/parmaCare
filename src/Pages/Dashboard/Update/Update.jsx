/** @format */
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const imgeHostintKey = import.meta.env.VITE_IMAGE_HOSTING;
const imageHosting = `https://api.imgbb.com/1/upload?key=${imgeHostintKey}`
const Update = () => {
  const {name,price, recipe, category, _id} = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(imageHosting, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      if (menuRes.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is update in the database`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  
  };
  return (
    <div>
      <SectionTitle
        heading="UPDATE ITEM"
        subHeading="NEED TO UPDATE"></SectionTitle>
      <div className="max-w-screen-md mx-auto">
        <form
          className=""
          onSubmit={handleSubmit(onSubmit)}>
          <div className="label ">
            <span className="label-text text-xl font-semibold">Name</span>
          </div>
          <input
            {...register("name")}
            defaultValue={name}
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
                required
                className="select w-full border select-primary">
                <option
                  disabled
                  defaultValue>
                  Select a category
                </option>
                <option defaultValue="salad">Pain Relief</option>
                <option defaultValue="pizza">Antibiotics</option>
                <option defaultValue="dessert">Cold and Flu</option>
                <option defaultValue="driks">Allergy</option>
                <option defaultValue="driks">Antidote</option>
                <option defaultValue="driks">Barbiturates</option>
              </select>
            </div>
            <div className="w-full">
              <div className="">
                <span className=" label text-xl font-semibold">Price</span>
              </div>
              <input
              defaultValue={price}
                {...register("price")}
                type="text"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <textarea
            {...register("recipe")}
            defaultValue={recipe}
            className="textarea w-full my-5 textarea-bordered"
            placeholder="Food details..."></textarea>
          <div>
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <button className="btn">Update item</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
