"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Button from "../common/Button";
import { FaChevronRight } from "react-icons/fa";
import { ContractContext, ContractState } from "@/app/contexts/ContractContext";
import Swal from "sweetalert2";
// import { ContractContext, ContractState } from "@/app/create-contract/page";

interface ContractTypeProps {
  setState: React.Dispatch<React.SetStateAction<ContractState>>;
}

const ContractType: React.FC<ContractTypeProps> = ({ setState }) => {
  const { onChange, handleNext, handlePrev, comingSoon, state } =
    useContext(ContractContext)!;
  const [activeTab, setActiveTab] = useState<string>("");

  const handleDivClick = (value: string) => {
    setActiveTab(value);
    setState({ ...state, contractType: value });
  };

  // const comingSoon = () => {
  //   Swal.fire({
  //     title: "Coming soon",
  //     text: "This feature will be available soon",
  //     icon: "info",
  //   });
  // };

  return (
    <div className="flex flex-col m-0 px-8 py-1 h-fit justify-start gap-12">
      <div className="flex flex-col items-start">
        <p className="font-semibold text-4xl">Create Contract 📄</p>
        <p className="text-xs font-light text-grey">Create an account below</p>
      </div>

      <div className="flex flex-col gap-4">
        <div
          className={`flex justify-between items-center p-4 rounded-md cursor-pointer ${
            activeTab === "fixed" ? "activeTab" : "border"
          } hover:border-1 hover:border-gray-600`}
          onClick={() => handleDivClick("fixed")}
        >
          <div className="flex items-center gap-4">
            <Image src="/icons/fixed.png" alt="icon" width={36} height={36} />
            <div>
              <p className="text-sm font-semibold">Fixed Rate</p>
              <p className="text-xs font-light">
                For contracts that have a fixed rate each payment cycle
              </p>
              <span className="flex items-center gap-1 mt-2">
                <p className="text-2xs text-primary">Learn more</p>
                <Image
                  src="/icons/info.svg"
                  alt="icon"
                  width={12}
                  height={12}
                />
              </span>
            </div>
          </div>
          <FaChevronRight
            size={14}
            color={activeTab === "fixed" ? "#14125e" : "#1C1B1F"}
          />
        </div>
        <div
          className={`flex justify-between items-center p-4 rounded-md cursor-pointer ${
            activeTab === "Pay As You Go" ? "activeTab" : "border"
          } hover:border-1 hover:border-gray-600`}
          onClick={() => handleDivClick("Pay As You Go")}
        >
          <div className="flex items-center gap-4">
            <Image
              src="/icons/payAsYouGo.png"
              alt="icon"
              width={36}
              height={36}
            />
            <div>
              <p className="text-sm font-semibold">Pay As You Go</p>
              <p className="text-xs font-light">
                For contracts that have varying rates each payment cycle
              </p>
              <span className="flex items-center gap-1 mt-2">
                <p className="text-2xs text-primary">Learn more</p>
                <Image
                  src="/icons/info.svg"
                  alt="icon"
                  width={12}
                  height={12}
                />
              </span>
            </div>
          </div>
          <FaChevronRight
            size={14}
            color={activeTab === "Pay As You Go" ? "#14125e" : "#1C1B1F"}
          />
        </div>
        <div
          className={`flex justify-between items-center p-4 rounded-md cursor-pointer ${
            activeTab === "milestone" ? "activeTab" : "border"
          } hover:border-1 hover:border-gray-600`}
          onClick={() => handleDivClick("milestone")}
        >
          <div className="flex items-center gap-4">
            <Image
              src="/icons/milestone.png"
              alt="icon"
              width={36}
              height={36}
            />
            <div>
              <p className="text-sm font-semibold">Milestone</p>
              <p className="text-xs font-light">
                For contracts that have different phases, each with its own rate
              </p>
              <span className="flex items-center gap-1 mt-2">
                <p className="text-2xs text-primary">Learn more</p>
                <Image
                  src="/icons/info.svg"
                  alt="icon"
                  width={12}
                  height={12}
                />
              </span>
            </div>
          </div>
          <FaChevronRight
            size={14}
            color={activeTab === "milestone" ? "#14125e" : "#1C1B1F"}
          />
        </div>
        <div
          className={`flex justify-between items-center p-4 rounded-md cursor-pointer ${
            activeTab === "Hourly Contract" ? "activeTab" : "border"
          } hover:border-1 hover:border-gray-600`}
          onClick={() => handleDivClick("Hourly Contract")}
        >
          <div className="flex items-center gap-4">
            <Image
              src="/icons/milestone.png"
              alt="icon"
              width={36}
              height={36}
            />
            <div>
              <p className="text-sm font-semibold">Hourly Contract</p>
              <p className="text-xs font-light">
                For contracts with fixed hourly rate and contract terms
              </p>
              <span className="flex items-center gap-1 mt-2">
                <p className="text-2xs text-primary">Learn more</p>
                <Image
                  src="/icons/info.svg"
                  alt="icon"
                  width={12}
                  height={12}
                />
              </span>
            </div>
          </div>
          <FaChevronRight
            size={14}
            color={activeTab === "milestone" ? "#14125e" : "#1C1B1F"}
          />
        </div>
      </div>

      <Button onClick={handleNext} disabled={state.contractType === ""} primary>
        Continue
      </Button>
    </div>
  );
};

export default ContractType;
