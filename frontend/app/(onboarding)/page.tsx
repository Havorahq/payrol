"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";
import Onboard from "../components/auth/Onboard";
import {
  OnboardingContext,
  OnboardingProvider,
} from "../contexts/OnboardingContext";

const Onboarding: React.FC = () => {
  const context = useContext(OnboardingContext);

  if (!context) {
    return <div>Error: OnboardingContext not found</div>;
  }

  const { state } = context;
  const { route } = state;

  console.log("Route: ", route);

  const renderPages = () => {
    switch (route) {
      case "signin":
        return <Signin />;
      case "signup":
        return <Signup />;
      case "onboard":
        return <Onboard />;
      default:
        return <Signin />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full contractBg">
      {/* <div className="flex h-full w-4/5 flex-col justify-evenly p-8 px-16 text-white md:w-1/2 primary-bg">
        <div className="flex items-center gap-4">
          <Image
            src="/icons/brandLogo.png"
            alt="Brand icon"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold">Xalari</h1>
        </div>
        <div>
          <p className="text-4xl font-semibold">
            Payroll <br />
            Management on the <br />
            blockchain!
          </p>
          <p className="mt-2 text-sm leading-6">
            Revolutionize Payroll Management with Blockchain Technology!
            Discover a secure, transparent, and efficient way to handle payroll,
            ensuring accuracy, trust, and simplicity for businesses of all
            sizes.
          </p>
        </div>
        <div className="self-center">
          <Image
            src="/images/calculator.png"
            alt="Calculator image"
            width={400}
            height={350}
          />
        </div>
      </div> */}
      <div className="w-fit text-black p-16 md:w-1/2 bg-white border border-1 shadow-lg rounded-xl h-fit lg:m-0 m-4">
        {renderPages()}
      </div>
    </div>
  );
};

const OnboardingPage = () => (
  <OnboardingProvider>
    <Onboarding />
  </OnboardingProvider>
);

export default OnboardingPage;
