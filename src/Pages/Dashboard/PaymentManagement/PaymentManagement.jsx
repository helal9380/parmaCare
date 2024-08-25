/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DataTable from "react-data-table-component";

const PaymentManagement = () => {
  const axiosSecore = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecore.get("/payments");
      return res.data;
    },
  });
  console.log(payments);

  const mutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecore.patch(`/payments/${id}`, { status: "paid" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("payments");
    },
  });

  const handleAcceptPayment = (id) => {
    mutation.mutate(id);
  };
  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          disabled={row.status.toLowerCase() === "paid"}
          onClick={() => handleAcceptPayment(row._id)}
          className="btn bg-[#66BC89] text-white btn-sm hover:bg-[#599470]">
          Accept Payment
        </button>
      ),
    },
  ];
  return (
    <div className="">
      <SectionTitle
        title={"Payment Management"}
        subTitle={"Welcome To Payment management"}></SectionTitle>
      <div className="">
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={payments || []}
            pagination // Enables pagination
            paginationPerPage={10} // Number of rows per page
            paginationRowsPerPageOptions={[5, 10, 15, 20]} // Options for rows per page
            highlightOnHover
            striped
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
