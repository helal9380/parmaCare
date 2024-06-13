/** @format */

import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/caduceus-medical-logo-design-vector-44577052.jpg";
import { FaCartPlus } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navber = () => {
  const { user, logOut } = useAuth();
  // console.log(user);
  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "text-white  font-semibold text-xl "
              : "text-white text-xl  font-semibold"
          }>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/shop"}
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold text-xl "
              : "text-white text-xl font-semibold"
          }>
          Shop
        </NavLink>
      </li>
      <li>
        <button className="">
          <FaCartPlus className="text-xl mt-2 text-white"></FaCartPlus>
          <div className="badge">+0</div>
        </button>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
        toast.success("Successfully log out");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not login!");
      });
  };
  return (
    <div className="navbar bg-[#66BC89]">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#21A06A] rounded-box">
            {links}
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={logo}
            alt="logo"
          />
          <a className="text-2xl text-white font-semibold">Parma care</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">{links}</ul>
      </div>
      <div className="navbar-end space-x-5">
        {user ? (
          
          <button
          onClick={handleLogOut}
          className="btn btn-sm">
          Log out
        </button>
        ) : (
          <Link
            className="uppercase text-white font-semibold "
            to={"/login"}>
            <button className="btn btn-sm">JOIN</button>
          </Link>
        )}
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="py-[2px] px-4 bg-white rounded-full">
            Languages
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-10 menu bg-[#66BC89] text-white font-semibold rounded-box">
            <li>
              <a>English</a>
            </li>
            <li>
              <a>Bangla</a>
            </li>
          </ul>
        </div>
        {/* profile menu */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu bg-[#66BC89] menu-sm dropdown-content mt-3 z-[1]  shadow text-white font-semibold rounded-box w-52">
              <li>
                <div>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                    className="justify-between">
                    Update Profile
                  </button>
                  <dialog
                    id="my_modal_4"
                    className="modal">
                    <div className="modal-box text-black">
                      <h3 className="font-bold text-lg text-center">Update Profile!</h3>
                      <div>
                        <img className="w-12 h-12 mx-auto rounded-full mt-2" src={user?.photoURL} alt="" />
                        <h3><span className="font-semibold text-lg">Name : </span> {user?.displayName}</h3>
                        <h3><span className="font-semibold text-lg">Email : </span> {user?.email}</h3>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button, it will close the modal */}
                          <button className="btn btn-sm bg-[#66BC89] text-white font-semibold">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </li>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navber;
