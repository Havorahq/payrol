import React, { ReactNode } from "react";
import { ImCancelCircle } from "react-icons/im";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 md:w-1/2 max-w-lg bg-white p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className="absolute top-0 right-2 mt-0 bg-transparent border-none cursor-pointer text-gray-400"
          onClick={onClose}
        >
          <ImCancelCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
