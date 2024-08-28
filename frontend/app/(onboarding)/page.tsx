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
      <div className="font-bricolage w-fit text-black p-16 md:w-1/2 bg-white border border-1 shadow-lg rounded-xl h-fit lg:m-0 m-4">
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
