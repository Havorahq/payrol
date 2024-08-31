"use client";

import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { CiGrid42 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoReceiptOutline } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { CgFileRemove } from "react-icons/cg";
import { BsGrid } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";

interface SidebarProps {
  title: string;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ title, user }) => {
  const router = useRouter();
  const { handleLogOut } = useDynamicContext();

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
        handleLogOut();
        router.push("/");
        console.log("Signed out");
      }
    });
  };

  // console.log("Sidebar user check: ", user);

  return (
    <div className="h-[98%] p-2 pb-8 bg-white flex flex-col items-center z-20 m-2 mb-2 border rounded-lg">
      <div className="mb-8">
        <Image
          src="/icons/brandLogo.png"
          alt="Brand icon"
          width={60}
          height={60}
        />
      </div>

      {
        <div className="lg:pt-16 pt-8 font-medium z-10 overflow-forced">
          <Link href="/dashboard">
            <div
              data-tooltip-id="tooltip-dashboard"
              data-tooltip-content="Dashboard"
              className={`flex items-center justify-center p-3 rounded-lg my-3 ${
                title === "Dashboard"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-400 hover:border hover:border-gray-300"
              }`}
            >
              {title === "Dashboard" ? (
                <Image
                  src="/icons/dashboard.svg"
                  alt="dashboard icon"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/icons/dashboardInactive.svg"
                  alt="dashboard icon"
                  width={24}
                  height={24}
                />
              )}
            </div>
          </Link>
          {user && (
            <div>
              {user?.userType !== "employee" && (
                <Link href="/create-contract">
                  <div
                    data-tooltip-id="tooltip-contract"
                    data-tooltip-content="Contract"
                    className={`flex items-center justify-center p-3 rounded-lg my-3 ${
                      title === "Contract"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-400 hover:border hover:border-gray-300"
                    }`}
                  >
                    {title === "Contract" ? (
                      <Image
                        src="/icons/contractIcon.svg"
                        alt="dashboard icon"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Image
                        src="/icons/contractIconInactive.svg"
                        alt="dashboard icon"
                        width={24}
                        height={24}
                      />
                    )}
                  </div>
                </Link>
              )}
              {user?.userType !== "employee" && (
                <Link href="/team">
                  <div
                    data-tooltip-id="tooltip-team"
                    data-tooltip-content="Team"
                    className={`flex items-center justify-center p-4 rounded-md my-3 ${
                      title === "Team"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-400 hover:border hover:border-gray-300"
                    }`}
                  >
                    {title === "Team" ? (
                      <Image
                        src="/icons/teamIcon.svg"
                        alt="dashboard icon"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Image
                        src="/icons/teamIconInactive.svg"
                        alt="dashboard icon"
                        width={24}
                        height={24}
                      />
                    )}
                  </div>
                </Link>
              )}
              <Link href="/payslip">
                <div
                  data-tooltip-id="tooltip-payslip"
                  data-tooltip-content="Payslip"
                  className={`flex items-center justify-center p-4 rounded-md my-3 ${
                    title === "Payslip"
                      ? "bg-primary text-white"
                      : "bg-white text-gray-400 hover:border hover:border-gray-300"
                  }`}
                >
                  {title === "Payslip" ? (
                    <Image
                      src="/icons/payslipIcon.svg"
                      alt="dashboard icon"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/icons/payslipIconInactive.svg"
                      alt="dashboard icon"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
              </Link>
            </div>
          )}
          <Link href="/profile">
            <div
              data-tooltip-id="tooltip-profile"
              data-tooltip-content="Profile"
              className={`flex items-center justify-center p-3 rounded-lg my-3 ${
                title === "Profile"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-400 hover:border hover:border-gray-300"
              }`}
            >
              {title === "Profile" ? (
                <Image
                  src="/icons/user.svg"
                  alt="profile icon"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/icons/userInactive.svg"
                  alt="profile icon"
                  width={24}
                  height={24}
                />
              )}
            </div>
          </Link>
          <div
            data-tooltip-id="tooltip-signout"
            data-tooltip-content="Sign Out"
            onClick={handleSignout}
            className="flex items-center justify-center p-4 rounded-md cursor-pointer text-gray-400 hover:border hover:border-gray-300"
          >
            <Image
              src="/icons/logoutInactive.svg"
              alt="logout icon"
              width={24}
              height={24}
            />
          </div>
        </div>
      }
      <Tooltip id="tooltip-dashboard" place="right" />
      <Tooltip id="tooltip-profile" place="right" />
      <Tooltip id="tooltip-contract" place="right" />
      <Tooltip id="tooltip-team" place="right" />
      <Tooltip id="tooltip-payslip" place="right" />
      <Tooltip id="tooltip-signout" place="right" />
    </div>
  );
};

export default Sidebar;
