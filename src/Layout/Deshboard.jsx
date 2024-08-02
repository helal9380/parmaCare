/** @format */

import { CgProfile } from "react-icons/cg";
import {
  FaCartPlus,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";

import { FaIdCard, FaSpoon } from "react-icons/fa6";
import { IoBook } from "react-icons/io5";

import useCarts from "../Hooks/useCarts";
import useAdmin from "../Hooks/useAdmin";

const Deshboard = () => {
  const [cart] = useCarts();
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className="w-64 p-10 bg-[#66BC89] text-white min-h-screen font-semibold">
        <h2 className="text-xl font-semibold my-2">My Dashboard</h2>
        {isAdmin ? (
          <div>
            <ul className="space-y-5">
              <li className="flex items-center gap-2">
                <FaHome></FaHome>
                <NavLink to={"/dashboard/adminHome"}>ADMIN HOME</NavLink>
              </li>
              <li className="flex items-center gap-2">
                <FaSpoon></FaSpoon>
                <NavLink to={"/dashboard/addItem"}>ADD ITEMS</NavLink>
              </li>
              <li className="flex items-center gap-2">
                <FaList></FaList>
                <NavLink className='uppercase' to={"/dashboard/manageCategory"}>Manage Category</NavLink>
              </li>
            
              <li className="flex items-center gap-2">
                <FaUser></FaUser>
                <NavLink to={"/dashboard/users"}>ALL USERS</NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul className="space-y-5">
              <li className="flex items-center gap-2">
                <FaShoppingCart></FaShoppingCart>
                <NavLink to={"/dashboard/cart"}>
                  My Cart ({cart.length})
                </NavLink>
              </li>
             
            </ul>
          </div>
        )}
        {/* shared */}
        <div className="w-full h-[2px] bg-slate-500 my-5"></div>
        <ul className="space-y-5">
          <li className="flex items-center gap-2">
            <FaHome></FaHome>
            <Link to={"/"}>Home</Link>
          </li>
          <li className="flex items-center gap-2">
            <FaIdCard></FaIdCard>
            <Link to={"/shop"}>Shop</Link>
          </li>
          <li className="flex items-center gap-2">
            <FaHome></FaHome>
            <Link to={"/order/:category"}>Order</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-10 bg-gray-200">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Deshboard;
