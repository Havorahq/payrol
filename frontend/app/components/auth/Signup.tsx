import React, { useState, useContext } from "react";
import { OnboardingContext } from "../../contexts/OnboardingContext";
import Button from "../common/Button";
import Image from "next/image";
import { DynamicWidget } from "../../../lib/dynamic";

const Signup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(OnboardingContext);

  if (!context) {
    return null; // Or handle the case where context is undefined
  }

  const { onRouteChange, onTabChange, onReset, state } = context;
  const { activeTab } = state;

  return (
    <div className="m-8 p-8 h-full flex flex-col justify-center overflow-y-scroll gap-12">
      <div className="flex flex-col items-center">
        <h1>Welcome 👋🏼</h1>
        <p className="">Please Create an account</p>
        <p className="mt-2 text-gray-400 text-xs">
          You will be signed in if you already have an account
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex gap-4 my-4">
          <div
            className={`p-4 rounded cursor-pointer flex items-center gap-3 ${
              activeTab === "business" ? "activeTab" : "border"
            } hover:border-1 hover:border-gray-600`}
            onClick={() => {
              onTabChange("business");
              onReset();
            }}
          >
            <Image
              src="/icons/businessIcon.png"
              alt="icon"
              width={36}
              height={36}
            />
            <div>
              <h2 className="text-xs font-medium text-left">Business</h2>
              <p className="font-dm-sans text-[10px] font-normal leading-4 text-left">
                Sign In As a Business
              </p>
            </div>
          </div>
          <div
            className={`p-4 rounded cursor-pointer flex items-center gap-3 ${
              activeTab === "employee" ? "border-2 border-blue-500" : "border"
            } hover:border-1 hover:border-gray-600`}
            onClick={() => {
              onTabChange("employee");
              onReset();
            }}
          >
            <Image
              src="/icons/employeeIcon.png"
              alt="icon"
              width={36}
              height={36}
            />
            <div>
              <h2 className="text-xs font-medium text-left">Employee</h2>
              <p className="font-dm-sans text-[10px] font-normal leading-4 text-left">
                Sign In As an Employee
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
      <Button onClick={() => console.log("Clicked!")}>
            <DynamicWidget />
          </Button>
        </div>
      </div>

      <p className="self-center text-sm">
        Already have an account?{" "}
        <span
          className="text-gradient font-medium cursor-pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default Signup;
