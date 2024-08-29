import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import Sidebar from "../sidebar/Sidebar";

interface DrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
  user: any;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, closeDrawer, user }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-40 h-full transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } bg-white z-20`}
    >
      <MdOutlineCancel
        className="absolute top-6 right-5 cursor-pointer text-gray-400"
        size={24}
        onClick={closeDrawer}
      />
      <Sidebar title="Menu" user={user} />
    </div>
  );
};

export default Drawer;
