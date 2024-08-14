"use client";

import React, { useContext } from "react";
import Button from "../common/Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { ContractContext } from "@/app/contexts/ContractContext";
import Input from "../common/Input";

const Wallet: React.FC = () => {
  const { onChange, handleNext, handlePrev, state } =
    useContext(ContractContext)!;

  return (
    <div className="flex flex-col m-8 p-8 h-full justify-center gap-12">
      <span
        className="flex items-center gap-2 text-primary cursor-pointer"
        onClick={handlePrev}
      >
        <FaChevronLeft />
        <p className="text-xs">Previous</p>
      </span>
      <div className="flex flex-col items-start">
        <p className="font-semibold text-4xl">Wallet Details</p>
        <p className="text-xs font-light text-grey">
          Fill in your wallet details below
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="Enter wallet address"
          type="text"
          name="walletAddress"
          value={state.walletAddress}
          onChange={onChange}
          placeholder="Wallet Address"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={handleNext} disabled={!state.walletAddress} primary>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Wallet;
