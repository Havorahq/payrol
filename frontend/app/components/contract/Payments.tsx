"use client";

import React, { useContext } from "react";
import Button from "../common/Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Input from "../common/Input";
import { ContractContext } from "@/app/contexts/ContractContext";

const Payments: React.FC = () => {
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
        <h1>Payment Schedule</h1>
        <p className="text-xs font-light text-grey">
          Fill in the payment details below
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="Monthly Rate"
          type="text"
          name="monthlyRate"
          id="monthlyRate"
          value={state.monthlyRate}
          onChange={onChange}
          placeholder="Monthly Rate"
          className="p-2 border border-gray-300 rounded"
        />
        {/* <input
          type="text"
          name="milestoneTitles"
          value={state.milestoneTitles.join(", ")}
          onChange={onChange}
          placeholder="Milestone Titles"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="milestoneRates"
          value={state.milestoneRates.join(", ")}
          onChange={onChange}
          placeholder="Milestone Rates"
          className="p-2 border border-gray-300 rounded"
        /> */}
      </div>
      <div className="flex justify-between mt-4">
        {/* <Button
          text="Back"
          iconLeft={<FaChevronLeft size={14} />}
          onClick={handlePrev}
        /> */}
        <Button
          onClick={handleNext}
          disabled={
            !state.monthlyRate 
            // !state.milestoneTitles.length ||
            // !state.milestoneRates.length
          }
          primary
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Payments;
