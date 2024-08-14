/** @format */
import { useQuery } from "@tanstack/react-query";
import logo from "../../../assets/caduceus-medical-logo-design-vector-44577052.jpg";
import useAuth from "../../../Hooks/useAuth";
import { useReactToPrint } from "react-to-print";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useRef } from "react";
const Invoice = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payment = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
  });
  return (
    <div ref={componentRef}>
      <div className="bg-[#66BC89] p-5 flex justify-between">
        <div>
          <div className="w-20 rounded-full">
            <img
              src={logo}
              alt="logo"
            />
          </div>
          <h1 className="text-4xl font-semibold text-white mt-2">
            Invoice Page {payment.length}
          </h1>
        </div>
        <div className="text-white space-y-1 text-right">
          <h2 className="text-3xl font-semibold mb-2">Parma Care</h2>
          <h3>
            <span className="font-semibold">Address:</span> 12/320,Chattogram
          </h3>
          <h3>
            <span className="font-semibold">Country:</span> Bangladesh
          </h3>
          <h3>
            <span className="font-semibold">Email:</span>{" "}
            asadurrahman9380@gmail.com
          </h3>
          <h3>
            <span className="font-semibold">Phone:</span> 01875639815
          </h3>
        </div>
      </div>
      <div className="bg-white px-4 pt-5">
        <div className="flex justify-between">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">Customar Information</h2>
            <h4>Name: {user.displayName}</h4>
            <h4>Email: {user.email}</h4>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrint}
              className="btn bg-[#66BC89] text-white hover:bg-[#45805c]">
              Print PDF
            </button>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  {/* <th>User name</th> */}
                  <th>Transition Id</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {payment.map((item, index) => (
                  <tr key={index}>
                    {index + 1}

                    <td>{item.transactionId}</td>
                    <td>{item.date}</td>
                    <td>${item.price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">
                        {item.status}
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="my-8">
              <p className="text-center">Thank you for your purchase!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
