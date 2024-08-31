import React from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import Button from "../common/Button";
import { usePathname } from "next/navigation";
import Preloader from "../common/Preloader";

interface HeaderProps {
  toggleDrawer: () => void;
  title: string;
  user: any;
}

const Header: React.FC<HeaderProps> = ({ title, toggleDrawer, user }) => {
  // Mimic user data for UI rendering
  const userData = {
    first_name: "John",
    last_name: "Doe",
    user_type: "admin",
  };

  const pathName = usePathname();

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
          className="cursor-pointer z-50 text-black h-8 w-8"
          onClick={toggleDrawer}
        />
      </div>
      <div className="flex items-center justify-between lg:px-12 px-4">
        <p className="text-[#0A112F] text-3xl font-medium headerTitle">
          {title}
        </p>
        {
          <div className="flex items-center justify-end p-4 bg-white rounded-md gap-4 md:gap-8">
            <div className="p-2 bg-black rounded-lg text-white text-sm font-semibold cursor-pointer font-bricolage">
              {user ? `${user?.firstName} ${user?.lastName}`: <Preloader height={20} color="#fff" />}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
