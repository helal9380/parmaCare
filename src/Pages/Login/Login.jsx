/** @format */
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/official-login.jpg";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const { signIn, gooleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        toast.success("Successfully login");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };
  const handleGoogle = () => {
    gooleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            console.log(res.data);
            toast.success("Successfully login & save to the!");
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Sorry not login!");
      });
  };
  return (
    <div className="md:w-8/12 mx-auto">
      <div className="md:flex justify-between items-center gap-2">
        <div>
          <img
            src={loginImg}
            alt=""
          />
        </div>
        <form
          className="space-y-5 border-2 p-5 rounded border-[#66BC89]"
          onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-3xl font-semibold mb-2">Login</h2>
          <div className="w-12 h-[2px] bg-[#66BC89] mx-auto"></div>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
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
            Are you new? please{" "}
            <Link
              className="text-[#66BC89] font-semibold"
              to={"/register"}>
              Register
            </Link>
          </p>
          {/* errors will return when field validation fails  */}
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
          <input
            className="w-full py-2 px-5 rounded-xl font-semibold cursor-pointer bg-[#66BC89] text-white"
            type="submit"
            value="Login"
          />
          <div>
            <h2 className="text-[#66BC89] text-center">---OR---</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGoogle}
                className="btn btn-sm text-white bg-[#66BC89] rounded">
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

export default Login;
