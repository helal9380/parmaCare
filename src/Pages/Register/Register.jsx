/** @format */

import { Link } from "react-router-dom";
import loginImg from "../../assets/official-login.jpg";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
    const {createUser} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data.email);
    createUser(data.email, data.password)
    .then(result => {
        console.log(result);
        toast.success('Registeration confirm')
    })
    .catch(error => {
        console.log(error);
        toast.error('Something wrong!')
    })
  };
  return (
    <div className="md:w-8/12 mx-auto my-5">
      <div className="md:flex flex-row-reverse justify-between items-center gap-2">
        <div>
          <img
            src={loginImg}
            alt=""
          />
        </div>
        <form
          className="space-y-5 border-2 p-5 rounded border-[#66BC89]"
          onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-3xl font-semibold mb-2">Register!</h2>
          <div className="w-12 h-[2px] bg-[#66BC89] mx-auto"></div>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your name"
            className="input input-bordered w-full"
          />
          {/* {errors.na && (
            <span className="text-red-500">This field is required</span>
          )} */}
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="input input-bordered w-full"
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
          <input
            type="text"
            {...register("photo_url")}
            placeholder="Enter your photo url"
            className="input input-bordered w-full"
          />
          
          {/* include validation with required or other standard HTML validation rules */}
          <input
            {...register("password", { required: true })}
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="input input-bordered w-full"
          />
          <p>
            Have you already an account?{" "}
            <Link
              className="text-[#66BC89] font-semibold"
              to={"/login"}>
              Login
            </Link>
          </p>
          {/* errors will return when field validation fails  */}
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
          <input
            className="w-full py-2 px-5 rounded-xl font-semibold cursor-pointer bg-[#66BC89] text-white"
            type="submit"
            value="Register"
          />
          <div>
            <h2 className="text-[#66BC89] text-center">---OR---</h2>
            <div className="flex flex-row-reverse justify-center gap-4">
              <button className="btn btn-sm text-white bg-[#66BC89] rounded">
                <FaGoogle></FaGoogle>Google
              </button>
              <button className="btn btn-sm text-white bg-[#66BC89] rounded">
                <FaGithub></FaGithub>GitHub
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
