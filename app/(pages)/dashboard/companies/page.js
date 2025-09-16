"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoMdArrowDropdown,
} from "react-icons/io";
import {
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import Link from "next/link";

const TableHeader = ({
  data,
  sortingHandlerInAscendingOrder,
  sortingHandlerInDescendingOrder,
}) => {
  return (
    <div
      className={`flex gap-3 items-center ${data.customClass} flex-shrink-0 whitespace-nowrap min-w-[200px]`}
    >
      <span className="capitalize text-gray-600 font-medium">{data.title}</span>
      {data.sorting && (
        <span className="flex flex-col text-xs relative">
          <IoIosArrowUp
            className="absolute bottom-[-1.5px] hover:text-blue-600 transition-all cursor-pointer"
            onClick={() => sortingHandlerInAscendingOrder(data.title)}
          />
          <IoIosArrowDown
            className="absolute top-[-1.5px] hover:text-blue-600 transition-all cursor-pointer"
            onClick={() => sortingHandlerInDescendingOrder(data.title)}
          />
        </span>
      )}
    </div>
  );
};

const Companies = () => {
  const companiesData = [
    {
      id: "1",
      user: "Samsung",
      email: "john.doe@samsung.com",
      phone: "9876543210",
      status: "Active",
      joinedDate: "2025-08-15",
    },
    {
      id: "2",
      user: "Intel",
      email: "jane.smith@intel.com",
      phone: "8765432109",
      status: "Active",
      joinedDate: "2025-08-14",
    },
    {
      id: "3",
      user: "NVIDIA",
      email: "mike.jones@nvidia.com",
      phone: "7654321098",
      status: "Active",
      joinedDate: "2025-08-13",
    },
    {
      id: "4",
      user: "Adobe",
      email: "susan.davis@adobe.com",
      phone: "6543210987",
      status: "Active",
      joinedDate: "2025-08-12",
    },
    {
      id: "5",
      user: "Salesforce",
      email: "peter.wilson@salesforce.com",
      phone: "5432109876",
      status: "Active",
      joinedDate: "2025-08-11",
    },
    {
      id: "6",
      user: "Cisco",
      email: "lisa.brown@cisco.com",
      phone: "4321098765",
      status: "Active",
      joinedDate: "2025-08-10",
    },
    {
      id: "7",
      user: "HP",
      email: "david.miller@hp.com",
      phone: "3210987654",
      status: "Active",
      joinedDate: "2025-08-09",
    },
    {
      id: "8",
      user: "Dell",
      email: "amy.white@dell.com",
      phone: "2109876543",
      status: "Active",
      joinedDate: "2025-08-08",
    },
    {
      id: "9",
      user: "Panasonic",
      email: "chris.green@panasonic.com",
      phone: "1098765432",
      status: "Active",
      joinedDate: "2025-08-07",
    },
    {
      id: "10",
      user: "LG",
      email: "maria.lopez@lg.com",
      phone: "0987654321",
      status: "Inactive",
      joinedDate: "2025-08-06",
    },
    {
      id: "11",
      user: "Sony",
      email: "jose.garcia@sony.com",
      phone: "9876512345",
      status: "Active",
      joinedDate: "2025-08-05",
    },
    {
      id: "12",
      user: "Siemens",
      email: "anna.martinez@siemens.com",
      phone: "8765412345",
      status: "Inactive",
      joinedDate: "2025-08-04",
    },
    {
      id: "13",
      user: "Philips",
      email: "kevin.moore@philips.com",
      phone: "7654312345",
      status: "Active",
      joinedDate: "2025-08-03",
    },
    {
      id: "14",
      user: "Nestle",
      email: "patricia.hall@nestle.com",
      phone: "6543212345",
      status: "Inactive",
      joinedDate: "2025-08-02",
    },
    {
      id: "15",
      user: "Coca-Cola",
      email: "robert.king@coca-cola.com",
      phone: "5432112345",
      status: "Inactive",
      joinedDate: "2025-08-01",
    },
    {
      id: "16",
      user: "Pepsico",
      email: "linda.wright@pepsico.com",
      phone: "4321012345",
      status: "Active",
      joinedDate: "2025-07-31",
    },
    {
      id: "17",
      user: "Unilever",
      email: "james.hill@unilever.com",
      phone: "3210912345",
      status: "Active",
      joinedDate: "2025-07-30",
    },
    {
      id: "18",
      user: "Procter & Gamble",
      email: "barbara.scott@pg.com",
      phone: "2109812345",
      status: "Inactive",
      joinedDate: "2025-07-29",
    },
  ];

  const companiesTableHeader = [
    { title: "User", sorting: true, customClass: "flex-[3]" },
    { title: "Phone", sorting: true, customClass: "flex-[2]" },
    { title: "Status", sorting: true, customClass: "flex-[2]" },
    { title: "Joined", sorting: true, customClass: "flex-[2]" },
    { title: "Action", sorting: false, customClass: "flex-[2] justify-center" },
  ];

  const [filteredData, setFilteredData] = useState(companiesData);
  const [displayData, setDisplayData] = useState([]);
  const [editRow, setEditRow] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Users");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pathname = usePathname();

  // Sorting logic
  function sortProducts(data, type, order) {
    return [...data].sort((a, b) => {
      let result = 0;
      if (type === "user") result = a.user.localeCompare(b.user);
      if (type === "status") result = a.status.localeCompare(b.status);
      if (type === "phone") result = a.phone.localeCompare(b.phone);
      if (type === "joined")
        result = new Date(a.joinedDate) - new Date(b.joinedDate);
      return order === "asc" ? result : -result;
    });
  }

  const sortingHandlerInAscendingOrder = (type) => {
    setDisplayData(sortProducts(displayData, type.toLowerCase(), "asc"));
  };
  const sortingHandlerInDescendingOrder = (type) => {
    setDisplayData(sortProducts(displayData, type.toLowerCase(), "desc"));
  };

  // Filter + search
  useEffect(() => {
    let filtered = [...companiesData];
    if (statusFilter !== "All Users") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (c) =>
          c.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [statusFilter, searchTerm]);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  useEffect(() => {
    setDisplayData(filteredData.slice(indexOfFirstRow, indexOfLastRow));
  }, [filteredData, currentPage, rowsPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(Number(rows));
    setCurrentPage(1);
  };

  const editHandler = () => {
    editRow
      ? toast.success("Company edited successfully")
      : toast.error("Please select a company");
  };

  const deleteHandler = () => {
    if (editRow) {
      toast.success("Company deleted successfully");
      setEditRow("");
    } else {
      toast.error("Please select a company");
    }
  };

  const formatDisplayDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) rangeWithDots.push(1, "...");
    else rangeWithDots.push(1);
    rangeWithDots.push(...range);
    if (currentPage + delta < totalPages - 1)
      rangeWithDots.push("...", totalPages);
    else if (totalPages > 1) rangeWithDots.push(totalPages);
    return rangeWithDots;
  };

  return (
    <div className="w-full h-[calc(100vh-65px)] px-5 pb-5 flex flex-col">
      <h2 className="capitalize text-lg font-semibold text-[#2F3031] py-5">
        {pathname.split("/").pop()}
      </h2>
      <div className="w-full h-full flex flex-col border border-border rounded-[10px] min-h-0">
        {/* Header */}
        <div className="w-full flex justify-between items-center h-[82px] px-6 border-b border-border">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="w-4 h-4 absolute left-3 top-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {/* Filter */}
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All Users">All Users</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <IoMdArrowDropdown className="absolute right-2 top-3 pointer-events-none text-gray-400" />
            </div>
          </div>
          <Link
            href={"/dashboard/companies/add-new"}
            className="bg-primary cursor-pointer text-white px-4 h-[42px] rounded-[4px] hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <span className="text-2xl mb-1">+</span>
            Add New
          </Link>
        </div>

        {/* Table */}
        <div className="w-full flex-1 min-h-0 overflow-y-auto">
          <div className="w-full flex py-3 px-6 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
            {companiesTableHeader.map((data, i) => (
              <TableHeader
                data={data}
                key={i}
                sortingHandlerInAscendingOrder={sortingHandlerInAscendingOrder}
                sortingHandlerInDescendingOrder={
                  sortingHandlerInDescendingOrder
                }
              />
            ))}
          </div>

          {displayData.length > 0 ? (
            displayData.map((data) => (
              <div
                key={data.id}
                className="flex items-center py-2 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-[3]">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {data.user}
                    </span>
                    <span className="text-sm text-gray-500">{data.email}</span>
                  </div>
                </div>
                <div className="flex-[2]">
                  <span className="text-gray-700">{data.phone}</span>
                </div>
                <div className="flex-[2]">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      data.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1 ${
                        data.status === "Active" ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></span>
                    {data.status}
                  </span>
                </div>
                <div className="flex-[2]">
                  <span className="text-gray-700">
                    {formatDisplayDate(data.joinedDate)}
                  </span>
                </div>
                <div className="flex-[2] flex justify-center">
                  <div className="flex items-center gap-3 text-gray-400">
                    <button className="hover:text-blue-600 transition-colors">
                      <MdOutlineRemoveRedEye size={18} />
                    </button>
                    <button
                      className="hover:text-blue-600 transition-colors"
                      onClick={() => {
                        setEditRow(data.id);
                        editHandler();
                      }}
                    >
                      <MdOutlineEdit size={18} />
                    </button>
                    <button
                      className="hover:text-red-600 transition-colors"
                      onClick={() => {
                        setEditRow(data.id);
                        deleteHandler();
                      }}
                    >
                      <MdDeleteOutline size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center py-8 text-gray-500">
              No companies found matching your criteria
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-between items-center h-[60px] px-6 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded px-2 py-1 pr-6 text-sm"
                value={rowsPerPage}
                onChange={(e) => handleRowsPerPageChange(e.target.value)}
              >
                {[5, 10, 15, 20, 25, 30].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <IoMdArrowDropdown className="absolute right-1 top-1.5 pointer-events-none text-gray-400 text-xs" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {filteredData.length === 0
                ? "0 - 0 of 0"
                : `${indexOfFirstRow + 1} - ${Math.min(
                    indexOfLastRow,
                    filteredData.length
                  )} of ${filteredData.length}`}
            </span>
            <div className="flex items-center gap-2">
              {getPageNumbers().map((pageNum, index) =>
                pageNum === "..." ? (
                  <span key={index} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => paginate(pageNum)}
                    className={`px-2 py-1 rounded text-sm ${
                      currentPage === pageNum
                        ? "bg-[#F7F7F7] text-gray-600"
                        : "hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage === totalPages || filteredData.length === 0
                  }
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
