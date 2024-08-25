/** @format */

import { CgProfile } from "react-icons/cg";
import {
  FaCartPlus,
  FaHistory,
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
import { MdPayment } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { FcSalesPerformance } from "react-icons/fc";
import { GrUserAdmin } from "react-icons/gr";

const Deshboard = () => {
  const [cart] = useCarts();
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      
      <div className="w-64 p-10 bg-[#66BC89] text-white min-h-screen font-semibold">
        <h2 className="text-2xl font-semibold my-3">My Dashboard</h2>
        {isAdmin ? (
          <div>
            <ul className="space-y-5">
              <li className="flex items-center gap-2">
              <GrUserAdmin />
                <NavLink to={"/dashboard/adminHome"}>Admin Home</NavLink>
              </li>
              <li className="flex items-center gap-2">
                <FaSpoon></FaSpoon>
                <NavLink to={"/dashboard/addItem"}>Add Items</NavLink>
              </li>
              <li className="flex items-center gap-2">
                <FaList></FaList>
                <NavLink className='' to={"/dashboard/manageCategory"}>Manage Category</NavLink>
              </li>
            
              <li className="flex items-center gap-2">
                <FaUser></FaUser>
                <NavLink to={"/dashboard/users"}>All Users</NavLink>
              </li>
              <li className="flex items-center gap-2">
              <MdPayment />
                <NavLink to={"/dashboard/payment_management"}>P-Management</NavLink>
              </li>
              <li className="flex items-center gap-2">
              <FcSalesPerformance className="text-white" />
                <NavLink to={"/dashboard/salesReport"}>Sales Report</NavLink>
              </li>
              <li className="flex items-center gap-2">
              <SiGoogletagmanager />
                <NavLink to={"/dashboard/manageAdvertise"}>M-B_Advertise</NavLink>
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
              <li className="flex items-center gap-2">
            <FaHistory></FaHistory>
            <Link to={"/dashboard/history"}>Purchess History</Link>
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
        </ul>
      </div>
      <div className="flex-1 p-10 bg-gray-200">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Deshboard;
