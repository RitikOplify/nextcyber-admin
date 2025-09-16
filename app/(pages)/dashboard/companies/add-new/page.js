"use client";

import AddCompanyProfile from "@/components/AddCompanyProfile";
import { usePathname } from "next/navigation";
import React from "react";

const AddNewCompany = () => {
  const pathname = usePathname();
  const heading = pathname.split("/").pop();
  return (
    <div className="w-full h-[calc(100vh-65px)] px-5 pb-10 flex flex-col overflow-y-scroll">
      <h2 className="capitalize text-lg font-semibold text-[#2F3031] py-5">
        {/* {heading.includes("-") ? heading.split("-").join(" ") : heading} */}
        Add New Company
      </h2>
      <AddCompanyProfile />
    </div>
  );
};

export default AddNewCompany;
