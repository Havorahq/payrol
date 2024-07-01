"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CiGrid42 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoReceiptOutline } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import Swal from "sweetalert2";

interface SidebarProps {
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title }) => {
//   const handleSignout = () => {
//     console.log("Signed out");
//   };

  const handleSignout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to sign out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Signed out");
      }
    });
  };

  return (
    <div className="h-full p-8 bg-white">
      <div className="mb-8">
        <Image
          src="/icons/secondaryLogo.png"
          alt="Brand icon"
          width={110}
          height={28}
        />
      </div>
      <div className="mt-16 font-medium">
        <Link href="/dashboard">
          <div
            className={`flex items-center gap-4 p-4 rounded-md my-3 ${
              title === "Dashboard"
                ? "bg-primary text-white"
                : "bg-white text-gray-400 hover:border hover:border-gray-300"
            }`}
          >
            <CiGrid42
              className={`w-5 h-5 ${
                title === "Dashboard" ? "text-white" : "text-gray-400"
              }`}
            />
            Dashboard
          </div>
        </Link>
        <Link href="/profile">
          <div
            className={`flex items-center gap-4 p-4 rounded-md my-3 ${
              title === "Profile"
                ? "bg-primary text-white"
                : "bg-white text-gray-400 hover:border hover:border-gray-300"
            }`}
          >
            <CgProfile
              className={`w-5 h-5 ${
                title === "Profile" ? "text-white" : "text-gray-400"
              }`}
            />
            Profile
          </div>
        </Link>
        <Link href="/payslip">
          <div
            className={`flex items-center gap-4 p-4 rounded-md my-3 ${
              title === "Payslip"
                ? "bg-primary text-white"
                : "bg-white text-gray-400 hover:border hover:border-gray-300"
            }`}
          >
            <IoReceiptOutline
              className={`w-5 h-5 ${
                title === "Payslip" ? "text-white" : "text-gray-400"
              }`}
            />
            Payslip
          </div>
        </Link>
        <div
          onClick={handleSignout}
          className="flex items-center gap-4 p-4 rounded-md mt-16 cursor-pointer text-gray-400 hover:border hover:border-gray-300"
        >
          <LiaSignOutAltSolid className="w-5 h-5 text-gray-400" />
          <div>
            <a className="cursor-pointer">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
