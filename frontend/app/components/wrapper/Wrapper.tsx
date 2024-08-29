"use client";

import React, { useState, ReactNode, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import routes, { Route } from "../../../plugins/routes";
import Drawer from "../drawer/Drawer";
import Image from "next/image";
import { findUser } from "@/app/api/helper-functions";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Preloader from "../common/Preloader";
import { useUserData } from "@/app/hooks/useUserData";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const { userData, isLoading, error } = useUserData();
  const userEmail = userData?.data?.data?.email;

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const getTitle = () => {
    let title = "Dashboard";
    routes.forEach((route: Route) => {
      if (pathname.includes(route.path)) {
        title = route.title;
      }
    });
    return title;
  };

  const fetchUserData = useCallback(async () => {
    if (!userEmail) return;
    try {
      const userData = await findUser(userEmail);

      const userType = userData?.data?.data;
      setAccountType(userType);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="flex w-full h-full relative overflow-hidden">
      <div className="hidden md:block relative z-40">
        <Sidebar title={getTitle()} user={accountType} />
      </div>
      <div className="contractBg w-full">
        {userData ? (
          <main className="flex-1 p-4 bg-[inherit] border relative z-10 rounded-lg m-2 h-[98%]">
            <Header
              title={getTitle()}
              toggleDrawer={toggleDrawer}
              user={accountType}
            />
            <div className="overflow-forced">{children}</div>
            {pathname === "/dashboard" && (
              <Image
                src="/images/signing-contract.png"
                alt="Contract illustration"
                width={500}
                height={450}
                className="absolute contractVector"
              />
            )}
          </main>
        ) : (
          <div>
            <Preloader />
          </div>
        )}
      </div>
      {isDrawerOpen && (
        <Drawer
          isOpen={isDrawerOpen}
          closeDrawer={toggleDrawer}
          user={accountType}
        />
      )}
    </div>
  );
};

export default Wrapper;
