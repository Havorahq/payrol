import React from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import Button from "../common/Button";
import { usePathname } from "next/navigation";

interface HeaderProps {
  toggleDrawer: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title, toggleDrawer }) => {
  // Mimic user data for UI rendering
  const userData = {
    first_name: "John",
    last_name: "Doe",
    user_type: "admin",
  };

  const pathName = usePathname()

  return (
    <div className="mb-8">
      <div className="flex md:hidden items-center justify-between bg-white rounded-md p-4 mb-12">
        <Image
          src="/icons/secondaryLogo.png"
          alt="brand logo"
          width={110}
          height={28}
        />
        <RiMenu4Fill
          size={20}
          className="cursor-pointer"
          onClick={toggleDrawer}
        />
      </div>
      <div className="flex items-center justify-between px-12">
        <p className="text-[#0A112F] text-3xl font-medium headerTitle">{title}</p>
        {pathName !== "/create-contract" && <div className="flex items-center justify-end p-4 bg-white rounded-md gap-4 md:gap-8">
          {/* <button className="bg-blue-500 text-white px-2 py-1 rounded w-fit">
            Connect
          </button> */}
           <div className="flex items-center justify-center rounded-full p-2 border">
            <HiDotsHorizontal color="#0A112F" size={20} />
          </div>
          {/* <Button primary>
            Create A Contract <HiMiniPlusCircle size={28} />
          </Button> */}
          {/* <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-full p-4 bg-primary">
              <p className="text-white font-medium">
                {userData.first_name[0]}
                {userData.last_name[0]}
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-600">
                {userData.first_name} {userData.last_name}
              </h5>
              <p className="text-gray-400">{userData.user_type}</p>
            </div>
          </div> */}
        </div>}
      </div>
    </div>
  );
};

export default Header;
