"use client";

import React, { useContext } from "react";
import Button from "../common/Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Input from "../common/Input";
import { ContractContext } from "@/app/contexts/ContractContext";

const Personal: React.FC = () => {
  const { onChange, handleNext, handlePrev, state } =
    useContext(ContractContext)!;

  return (
    <div className="flex flex-col m-8 lg:p-8 p-0 h-full justify-center gap-12">
      <span
        className="flex items-center gap-2 text-primary cursor-pointer"
        onClick={handlePrev}
      >
        <FaChevronLeft />
        <p className="text-xs">Previous</p>
      </span>
      <div className="flex flex-col items-start">
        <p className="font-semibold lg:text-4xl text-3xl">Personal Details</p>
        <p className="text-xs font-light text-grey">
          Fill in the employee details below
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="Employee Email"
          type="email"
          name="employeeEmail"
          id="employeeEmail"
          value={state.employeeEmail}
          onChange={onChange}
          placeholder="jonathanwick@example.com"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={handleNext} disabled={!state.employeeEmail} primary>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Personal;
