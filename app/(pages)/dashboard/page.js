"use client";
import SectionWrapper from "@/components/common/SectionWrapper";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Dashboard = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <SectionWrapper>
      <div className="w-full p-5 flex flex-col gap-5 items-start">
        <h2 className="capitalize text-lg font-semibold text-[#2F3031]">
          {pathname.split("/")[pathname.split("/").length - 1]}
        </h2>
        <p className="text-primary font-medium italic animate-pulse">
          This page is under development! Please check back later.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Dashboard;
