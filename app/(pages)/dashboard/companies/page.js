"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosSearch,
  IoMdClose,
} from "react-icons/io";
import Link from "next/link";
import { asyncGetCompanies } from "@/store/actions/companyAction";

export default function Page() {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // track prev values
  const prevStatusFilterRef = useRef(statusFilter);
  const prevSearchTermRef = useRef(debouncedSearchTerm);
  const prevLimitRef = useRef(limit);
  const prevPageRef = useRef(page);

  useEffect(() => {
    const isFilterActive = statusFilter !== "ALL";
    const hasSearch = debouncedSearchTerm.trim().length > 0;
    const isStudentsAvailable = company && company.length > 0;

    const isFilterChanged = prevStatusFilterRef.current !== statusFilter;
    const isSearchCleared =
      prevSearchTermRef.current.trim().length > 0 &&
      debouncedSearchTerm.trim().length === 0;
    const isLimitChanged = prevLimitRef.current !== limit;
    const isPageChanged = prevPageRef.current !== page;

    const isSearchChanged = prevSearchTermRef.current !== debouncedSearchTerm;
    if (isSearchChanged && page !== 1) {
      setPage(1);
      prevSearchTermRef.current = debouncedSearchTerm;
      return;
    }

    const shouldFetch =
      isInitialLoad ||
      hasSearch ||
      isPageChanged ||
      isLimitChanged ||
      (isFilterChanged && !isInitialLoad) ||
      (isSearchCleared && !isInitialLoad);

    if (!shouldFetch || (isStudentsAvailable && isInitialLoad)) {
      setIsInitialLoad(false);
      setIsSearching(false);
    } else {
      const setLoader = (loading) => {
        if (isInitialLoad) setIsInitialLoad(loading);
        else setIsSearching(loading);
      };

      dispatch(
        asyncGetCompanies(
          {
            search: debouncedSearchTerm,
            page,
            limit,
            sortBy,
            sortOrder,
            status: isFilterActive ? statusFilter : "",
          },
          setLoader
        )
      );
    }

    prevStatusFilterRef.current = statusFilter;
    prevSearchTermRef.current = debouncedSearchTerm;
    prevLimitRef.current = limit;
    prevPageRef.current = page;
  }, [
    dispatch,
    debouncedSearchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    company.length,
    statusFilter,
  ]);

  if (isInitialLoad) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)] w-full">
        <div className="animate-spin h-10 w-10 border-4 border-t-transparent border-primary rounded-full" />
      </div>
    );
  }

  return (
    <div className=" w-full px-6 py-4">
      <h2 className="text-heading-secondary font-semibold text-lg mb-4">
        Company
      </h2>

      <div className="overflow-auto rounded-[10px] border border-border">
        <div className="w-full flex items-center justify-between p-5 flex-wrap gap-5">
          {/* search + filter */}
          <div className="flex gap-5 items-center flex-wrap text-[13px]">
            <div className="flex items-center relative py-3 border border-border px-4 gap-2 rounded-md font-normal text-text-ternary">
              <IoIosSearch size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies..."
                className="outline-none border-none text-heading-secondary"
              />
              {searchTerm && (
                <IoMdClose
                  size={20}
                  onClick={() => setSearchTerm("")}
                  className="hover:text-heading-secondary absolute right-4 cursor-pointer"
                />
              )}
            </div>
            {/* <div className="relative border border-border rounded-md">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="outline-none appearance-none w-full pl-4 pr-8 py-3 cursor-pointer text-heading-secondary font-normal"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <IoIosArrowDown size={18} />
              </div>
            </div> */}
            {isSearching && (
              <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-primary rounded-full" />
            )}
          </div>
          <Link
            href={"/dashboard/companies/add-new"}
            className="flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-md text-[13px] font-semibold"
          >
            <AiOutlinePlus size={18} />
            Add Company
          </Link>
        </div>

        {company.length > 0 ? (
          <>
            <div className="relative sm:max-h-[calc(100vh-339.84px)] lg:max-h-[calc(100vh-277.17px)] overflow-auto table-scrollbar">
              <table className="min-w-full border-separate border-spacing-0">
                <thead className="sticky top-0 bg-white text-left text-[13px] text-text font-semibold">
                  <tr className="bg-background/40 whitespace-nowrap">
                    <th className="py-3 px-5 border border-border">Profile</th>
                    <th className="py-3 px-5 border border-border">Company</th>
                    <th className="py-3 px-5 border border-border">
                      Headquarter
                    </th>
                    <th className="py-3 px-5 border border-border">Founded</th>
                    <th className="py-3 px-5 border border-border">
                      Company Size
                    </th>
                    <th className="py-3 px-5 border border-border">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-text-secondary">
                  {company.map((user, i) => (
                    <tr key={i} className="whitespace-nowrap">
                      <td className="py-3 px-5 border-b border-border">
                        <div className=" flex gap-1.5 items-center">
                          <img
                            src={user.profilePicture.url}
                            alt={user.firstName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className=" flex flex-col">
                            <span>
                              {user.firstName} {user.lastName}
                            </span>
                            <span className=" text-xs text-gray-500">
                              {user.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-5 border-b border-border">
                        {user.companyName}
                      </td>
                      <td className="py-3 px-5 border-b border-border">
                        {user.headquarters}
                      </td>
                      <td className="py-3 px-5 border-b border-border capitalize">
                        {user.founded}
                      </td>
                      <td className="py-3 px-5 border-b border-border capitalize">
                        {user.companySize}
                      </td>
                      <td className="py-3 px-5 border-b border-border">
                        <div className=" flex gap-1 items-center">
                          <Link href={`/student/${user.id}`}>
                            <img
                              src="/icons/view.svg"
                              className="h-6 w-6"
                              alt="View"
                              title="View"
                            />
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            title="Delete"
                          >
                            <img
                              src="/icons/delete.svg"
                              className="h-6 w-6"
                              alt="Delete"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {/* <div className="flex items-center justify-between px-5 py-3 border-t border-border text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-text-secondary">Rows per page</span>
                <div className="relative border border-input rounded-md">
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="outline-none appearance-none w-full pl-2 pr-4 py-1 cursor-pointer text-sm text-text-secondary font-normal"
                  >
                    {[10, 20, 30].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <IoIosArrowDown size={16} className="text-text-secondary" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`${
                    page === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-text hover:bg-gray-50"
                  }`}
                >
                  <IoIosArrowBack size={20} />
                </button>
                <p className="text-text-secondary">
                  {page} of {totalPages}
                </p>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className={`${
                    page === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-text"
                  }`}
                >
                  <IoIosArrowForward size={20} />
                </button>
              </div>
            </div> */}
          </>
        ) : (
          <div className="text-center text-text-secondary border-t border-border">
            <p className="py-4 capitalize">No companies found.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* <CreateStudentModal isOpen={createStudentOpen} onClose={() => setCreateStudentOpen(false)} />

      <DeleteModel
        isOpen={isOpen}
        id={selectedStudentId}
        onClose={() => setIsOpen(false)}
        label="Student"
        onDelete={asyncDeleteStudent}
      /> */}
    </div>
  );
}
