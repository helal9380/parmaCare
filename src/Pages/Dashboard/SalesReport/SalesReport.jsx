/** @format */

import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
// import "jspdf-autotable";
import * as XLSX from "xlsx";

const SalesReport = () => {
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/sales")
          .then((res) => {
            setSales(res.data);
            setFilteredSales(res.data);
          })
          .catch((error) => {
            console.error("Error fetching sales data:", error);
          });
    }, [axiosSecure]);

    const columns = [
        { name: "Medicine Name", selector: (row) => row.productName, sortable: true },
        { name: "Seller Email", selector: (row) => row.sellerEmail, sortable: true },
        { name: "Buyer Email", selector: (row) => row.userEmail, sortable: true },
        { name: "Price", selector: (row) => row.price, sortable: true },
        { name: "Date", selector: (row) => new Date(row.date).toLocaleDateString(), sortable: true },
    ];

    const handleFilter = (startDate, endDate) => {
        const filtered = sales.filter((sale) => {
            const saleDate = new Date(sale.date);
            return saleDate >= startDate && saleDate <= endDate;
        });
        setFilteredSales(filtered);
    };

    const csvReport = {
        data: filteredSales,
        headers: [
            { label: "Medicine Name", key: "medicineName" },
            { label: "Seller Email", key: "sellerEmail" },
            { label: "Buyer Email", key: "buyerEmail" },
            { label: "Total Price", key: "totalPrice" },
            { label: "Date", key: "date" },
        ],
        filename: "Sales_Report.csv",
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredSales);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
        XLSX.writeFile(workbook, "Sales_Report.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Sales Report", 20, 10);
        doc.autoTable({
            head: [columns.map((col) => col.name)],
            body: filteredSales.map((sale) =>
                columns.map((col) => col.selector(sale))
            ),
        });
        doc.save("Sales_Report.pdf");
    };

    return (
        <div>
            <SectionTitle title="Sales Report" subTitle="Welcome to sales report" />
            <div>
           
                <div className="my-4 px-2">
                    {/* Date Range Filter */}
                    <label className="font-semibold">Start Date:</label>
                    <input
                    className="py-1 px-2 mx-2 rounded-lg"
                        id="start-date"
                        type="date"
                        onChange={(e) =>
                            handleFilter(
                                new Date(e.target.value),
                                new Date(document.getElementById("end-date").value)
                            )
                        }
                    />
                    <label className="font-semibold">End Date:</label>
                    <input
                     className="py-1 px-2 ml-2 rounded-lg"
                        id="end-date"
                        type="date"
                        onChange={(e) =>
                            handleFilter(
                                new Date(document.getElementById("start-date").value),
                                new Date(e.target.value)
                            )
                        }
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={filteredSales}
                    pagination
                    highlightOnHover
                    striped
                />

                <div className="flex justify-end gap-4 my-4">
                    <button onClick={exportToExcel} className="btn">Export as Excel</button>
                    <button onClick={exportToPDF} className="btn">Export as PDF</button>
                    <CSVLink {...csvReport} className="btn">Export as CSV</CSVLink>
                </div>
            </div>
        </div>
    );
};

export default SalesReport;
