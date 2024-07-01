"use client";

import React, { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import routes, { Route } from "../../../plugins/routes";
import Drawer from "../drawer/Drawer";

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
      <div className="hidden md:block w-1/4">
        <Sidebar title={getTitle()} />
      </div>
      <main className="flex-1 p-4 bg-[#F6F6F6]">
        <Header toggleDrawer={toggleDrawer} />
        {children}
      </main>
      {isDrawerOpen && (
        <Drawer isOpen={isDrawerOpen} closeDrawer={toggleDrawer} />
      )}
    </div>
  );
};

export default Wrapper;
