"use client";

import React, { useContext, useEffect, useState } from "react";
import Button from "../common/Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Input from "../common/Input";
import { ContractContext } from "@/app/contexts/ContractContext";
import InputSelect from "../common/InputSelect";

const Payments: React.FC = () => {
  const { onChange, handleNext, handlePrev, state } =
    useContext(ContractContext)!;

  const [label, setLabel] = useState("")

  useEffect(() => {
    switch (state?.contractType) {
      case "fixed":
        setLabel("Monthly Rate");
        break;

      case "Hourly Contract":
        setLabel("Hourly Rate");
        break;

      default:
        setLabel("Enter Rate");
        break;
    }
  }, [])

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
        <p className="font-semibold text-4xl">Payment Schedule</p>
        <p className="text-xs font-light text-grey">
          Fill in the payment details below
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <InputSelect
          label={label}
          type="text"
          name="monthlyRate"
          id="monthlyRate"
          value={state.monthlyRate}
          onChange={onChange}
          placeholder="1000"
          className="border border-gray-300 rounded"
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
        {state?.contractType === "milestone" && (
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p>Milestones</p>
                <p>Add Milestone below</p>
              </div>
              <div>Add Milestone +</div>
            </div>

            <div className="mt-2 w-100">
              <div className="flex items-center gap-4 w-100">
                <Input
                  label="Title"
                  type="text"
                  name="milestoneTitle"
                  id="milestoneTitle"
                  value={state.milestoneTitle}
                  onChange={onChange}
                  placeholder="Jonathan Wick"
                  className="p-2 border border-gray-300 rounded w-100"
                />
                <InputSelect
                  label={"Enter Rate"}
                  type="text"
                  name="monthlyRate"
                  id="monthlyRate"
                  value={state.monthlyRate}
                  onChange={onChange}
                  placeholder="1000"
                  className="p-2 border border-gray-300 rounded w-100"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
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
