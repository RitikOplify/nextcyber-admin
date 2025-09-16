"use client";
import SideNav from "@/components/common/SideNav";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { asyncCurrentUser } from "@/store/actions/authActions";

const DashboardLayout = ({ children }) => {
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [responsiveLayoutActive, setResponsiveLayoutActive] = useState(false);
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user === null) {
      dispatch(asyncCurrentUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!isLoading && user === null) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  const pathname = usePathname();

  function useAutoCloseMenu(
    setSidebarCollapse,
    responsiveLayoutActive,
    setResponsiveLayoutActive
  ) {
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 640px)");

      const handleResize = () => {
        if (mediaQuery.matches) {
          // screen >= 640px
          setResponsiveLayoutActive(false);
          setSidebarCollapse(false); // expand sidebar
        } else {
          // screen < 640px
          setResponsiveLayoutActive(true);
          setSidebarCollapse(true); // collapse sidebar
        }
      };

      // Run once on mount
      handleResize();

      mediaQuery.addEventListener("change", handleResize);

      return () => {
        mediaQuery.removeEventListener("change", handleResize);
      };
    }, [responsiveLayoutActive, setResponsiveLayoutActive]);
  }

  useAutoCloseMenu(
    setSidebarCollapse,
    responsiveLayoutActive,
    setResponsiveLayoutActive
  );

  const getPath = (index) => {
    const segments = pathname.split("/").filter(Boolean); // Remove empty segments
    const selectedSegments = segments.slice(0, index + 1);
    return "/" + selectedSegments.join("/");
  };
  if (isLoading || user === null) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-t-transparent border-primary rounded-full" />
      </div>
    );
  }
  return (
    <section className="w-full h-screen relative">
      <SideNav
        setSidebarCollapse={setSidebarCollapse}
        sidebarCollapse={sidebarCollapse}
      />
      <nav className="w-full h-[64px] fixed top-0 left-0">
        <div className="flex items-center h-full justify-between">
          <div
            className={`w-[240px] flex items-center pl-5 border-r border-border border-b  h-full ${
              sidebarCollapse ? "border-b-border" : "border-b-white"
            }`}
          >
            <Image
              src={"/logo.png"}
              alt="nextcybr-logo"
              width={512}
              height={95}
              className="w-[196px] h-auto -ml-[8px]"
            />
          </div>
          <div className="w-full flex-1 h-full flex items-center justify-between gap-6 border-b border-border px-5">
            <div className="flex items-center gap-1">
              {pathname.split("/").map((e, i) => {
                if (i === 0) {
                  return;
                } else {
                  return (
                    <div className="flex items-center gap-1 capitalize" key={i}>
                      <Link
                        href={getPath(i - 1)}
                        className={`${
                          i === pathname.split("/").length - 1
                            ? "text-black pointer-events-none"
                            : "text-icon"
                        }`}
                      >
                        {e.includes("-") ? e.split("-").join(" ") : e}
                      </Link>
                      {i === pathname.split("/").length - 1 ? (
                        <></>
                      ) : (
                        <IoIosArrowForward className="text-icon text-lg mt-0.5" />
                      )}
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex items-center gap-6">
              <Link href={"#"}>
                <Image
                  src={"/icons/notification.svg"}
                  alt="notification-icon"
                  width={18}
                  height={20}
                />
              </Link>

              <div className="w-[36px] h-[36px] flex items-top justify-center bg-gray-200 rounded-full overflow-hidden">
                <Image
                  src={"/model-image.jpg"}
                  alt="model-image"
                  width={640}
                  height={800}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full h-[64px]"></div>
      <div
        className={`flex h-[calc(100vh-65px)] box-border overflow-hidden relative ${
          sidebarCollapse
            ? "ml-[60px]"
            : responsiveLayoutActive
            ? "ml-[60px]"
            : "ml-[240px]"
        }`}
      >
        {children}
      </div>
    </section>
  );
};

export default DashboardLayout;
