/** @format */

import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(payments);
  return (
    <div>
      <SectionTitle
        title={"Payment"}
        subTitle={"All Payment History Page"}></SectionTitle>
      <div className="bg-[#66BC89] p-2 text-white font-semibold text-2xl">
        <h2>All Payment {payments.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Transiction Ids</th>
              <th>Price</th>
              <th>Status</th>
           
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.transactionId}</td>
                <td>{payment.price}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
