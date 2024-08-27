"use client";

import React, { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import routes, { Route } from "../../../plugins/routes";
import Drawer from "../drawer/Drawer";
import Image from "next/image";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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

  return (
    <div className="flex w-full h-full relative overflow-hidden">
      <div className="hidden md:block relative z-40">
        <Sidebar title={getTitle()} />
      </div>
      <div className="contractBg w-full">
        <main className="flex-1 p-4 bg-[inherit] border relative z-10 rounded-lg m-2 h-[98%]">
          <Header title={getTitle()} toggleDrawer={toggleDrawer} />
          <div className="overflow-forced">{children}</div>
          {
          pathname === "/dashboard" &&
          <Image
            src="/images/signing-contract.png"
            alt="Contract illustration"
            width={500}
            height={450}
            className="absolute contractVector"
          />}
        </main>
      </div>
      {isDrawerOpen && (
        <Drawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} />
      )}
    </div>
  );
};

export default Wrapper;
