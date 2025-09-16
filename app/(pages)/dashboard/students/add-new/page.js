"use client";
import ProfileDashboard from "@/components/ProfileDashboard";
import UserProfile from "@/components/UserProfile";

import { usePathname } from "next/navigation";
import React from "react";

const AddNewStudent = () => {
  const pathname = usePathname();
  const heading = pathname.split("/").pop();
  return (
    <div className="w-full h-[calc(100vh-65px)] px-5 pb-5 flex flex-col overflow-y-scroll">
      <h2 className="capitalize text-lg font-semibold text-[#2F3031] py-5">
        {/* {heading.includes("-") ? heading.split("-").join(" ") : heading} */}
        Add New Student
      </h2>
      <UserProfile />
      {/* <ProfileDashboard /> */}
    </div>
  );
};

export default AddNewStudent;
