import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { setSidebarCollapse } from "../store/features/appSettingSlice";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
// import { logoutAPIHandler } from "../services/authAPIHandler";
import { RxDashboard } from "react-icons/rx";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

const SideNav = ({ sidebarCollapse, setSidebarCollapse }) => {
  // const { sidebarCollapse } = useSelector((state) => state.appSetting);
  // const dispatch = useDispatch();
  const router = useRouter();

  const isAuthencated = true;
  const pathname = usePathname();

  console.log(pathname);

  // useEffect(() => {
  //   // console.log(pathname);
  // }, [pathname]);

  // const { isAuthencated } = useSelector((state) => state.auth);
  const navLinks = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "/icons/dashboard.svg",
      iconPrimary: "/icons/dashboard-primary.svg",
    },
    {
      title: "Students",
      path: "/dashboard/students",
      icon: "/icons/students.svg",
      iconPrimary: "/icons/students-primary.svg",
    },
    {
      title: "Companies",
      path: "/dashboard/companies",
      icon: "/icons/companies.svg",
      iconPrimary: "/icons/companies-primary.svg",
    },
    {
      title: "Mentors",
      path: "/dashboard/mentors",
      icon: "/icons/mentors.svg",
      iconPrimary: "/icons/mentors-primary.svg",
    },
    {
      title: "Reports",
      path: "/dashboard/reports",
      icon: "/icons/reports.svg",
      iconPrimary: "/icons/reports-primary.svg",
    },
    {
      title: "Subscriptions",
      path: "/dashboard/subscriptions",
      icon: "/icons/subscriptions.svg",
      iconPrimary: "/icons/subscriptions-primary.svg",
    },
  ];
  return (
    <div
      className={`${
        sidebarCollapse ? "w-[60px]" : "w-[240px]"
      } fixed top-[64px] left-0 border-e border-border bg-white z-[1000] bg-background flex flex-col justify-between pb-10 gap-2.5 d-broder`}
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* <div> */}
      <div
        className={`flex items-center py-3 bg-white  ${
          sidebarCollapse ? "px-0 justify-center" : "justify-normal px-4.5"
        }`}
      >
        {isAuthencated && !sidebarCollapse && (
          <>
            <Image
              src={"/icons/back-primary.svg"}
              alt="back-btn-icon"
              width={20}
              height={20}
              onClick={() => setSidebarCollapse(true)}
              className="w-[20px] aspect-square cursor-pointer hover:opacity-75 transition-all duration-200"
            />
          </>
        )}
        {isAuthencated && sidebarCollapse && (
          <Image
            src={"/icons/next-primary.svg"}
            alt="back-btn-icon"
            width={20}
            height={20}
            onClick={() => setSidebarCollapse(false)}
            className="w-[20px] aspect-square cursor-pointer hover:opacity-75 transition-all duration-200"
          />
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className={`w-full h-full relative flex flex-col`}>
          {navLinks.map((e, i) => {
            return (
              <li key={i} className={`w-full capitalize  `}>
                <Link href={e.path}>
                  <div
                    className={` flex items-center h-[48px] ${
                      pathname === e.path ? "bg-light-background" : ""
                    } hover:bg-light-background gap-3 ${
                      sidebarCollapse
                        ? "px-0 justify-center"
                        : "justify-normal px-4.5"
                    }`}
                  >
                    {pathname === e.path ? (
                      <Image
                        src={e.iconPrimary}
                        alt="sidenav-menu-icons"
                        width={20}
                        height={20}
                        className="w-[20px] aspect-square"
                      />
                    ) : (
                      <Image
                        src={e.icon}
                        alt="sidenav-menu-icons"
                        width={20}
                        height={20}
                        className="w-[20px] aspect-square"
                      />
                    )}

                    {!sidebarCollapse && (
                      <span
                        className={`text-sm font-medium ${
                          pathname === e.path
                            ? "text-primary"
                            : "text-[#434345]"
                        }`}
                      >
                        {e.title}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* </div> */}
      <div className={`w-full`}>
        <button
          className={`flex items-center py-2 gap-3 w-full cursor-pointer group transition-colors duration-200  ${
            sidebarCollapse ? "px-0 justify-center" : "justify-normal px-4.5"
          }`}
          onClick={() => {
            router.push("/");
            toast.success("Logged out successfully");
          }}
        >
          <span className={`text-xl text-icon group-hover:text-primary`}>
            <BiLogOut />
          </span>
          {!sidebarCollapse && (
            <span className="text-sm font-medium text-[#434345] group-hover:text-primary">
              Sign Out
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SideNav;
