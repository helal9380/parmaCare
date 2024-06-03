/** @format */

import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/caduceus-medical-logo-design-vector-44577052.jpg";
import { FaCartPlus } from "react-icons/fa";

const Navber = () => {
  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-white  font-semibold text-xl " : "text-white text-xl  font-semibold"
          }>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/shop"}
          className={({ isActive }) =>
            isActive ? "text-white font-semibold text-xl " : "text-white text-xl font-semibold"
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#21A06A] rounded-box w-52">
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
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-5">
        <Link
          className="uppercase text-white font-semibold "
          to={"/login"}>
          Join
        </Link>
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="py-[2px] px-4 bg-white rounded-full">
            Languages
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu bg-[#66BC89] text-white font-semibold rounded-box w-52">
            <li>
              <a>English</a>
            </li>
            <li>
              <a>Bangla</a>
            </li>
          </ul>
        </div>
        {/* profile menu */}
        <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu bg-[#66BC89] menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-white font-semibold rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Update Profile
                 
                  </a>
                </li>
                <li>
                  <a>Dashboard</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
      </div>
    </div>
  );
};

export default Navber;
