/** @format */

import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaDollarSign, FaUser } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { FcPaid } from "react-icons/fc";

const AdminHome = () => {
  const axiosSecore = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecore.get("/users");
      return res.data;
    },
  });
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecore.get("/pending");
      return res.data;
    },
  });
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecore.get("/payments");
      return res.data;
    },
  });
  const totalPrice = payments.reduce((sum,payment) =>  sum + payment.price,0);
  console.log(totalPrice, payments);
  return (
    <div>
      <SectionTitle
        title={"Information"}
        subTitle={"Welcome To Admin Page"}></SectionTitle>
      <div>
        <div className="stats w-full shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaDollarSign className="text-4xl" />
            </div>
            <div className="stat-title">Sales Revenue</div>
            <div className="stat-value">{totalPrice}$</div>
   
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUser className="text-4xl"></FaUser>
            </div>
            <div className="stat-title">All Users</div>
            <div className="stat-value">{users.length}</div>
    
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
            <MdPending className="text-4xl" />
            </div>
            <div className="stat-title">Pending Total</div>
            <div className="stat-value">{cart.length}</div>
       
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
            <FcPaid className="text-4xl" />
            </div>
            <div className="stat-title">Paid Total</div>
            <div className="stat-value">{payments.length}</div>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
