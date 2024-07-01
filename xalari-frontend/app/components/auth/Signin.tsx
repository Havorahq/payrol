import React, { useState, useContext } from "react";
import { OnboardingContext } from "../../contexts/OnboardingContext";
import Button from "../common/Button";

const Signin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(OnboardingContext);

  if (!context) {
    return null; // Or handle the case where context is undefined
  }

  const { onRouteChange } = context;

  return (
    <div className="m-8 p-8 h-full flex flex-col justify-center overflow-y-scroll gap-16">
      <div className="flex flex-col items-center">
        <h1>Welcome 👋🏼</h1>
        <p className="">Please sign in to your account</p>
        <p className="mt-2 text-gray-400 text-xs">
          You will be redirected to the sign up page if you don&apos;t have an
          account
        </p>
        <div className="flex justify-center">
          <Button onClick={() => console.log("Clicked!")}>
            Connect Wallet
          </Button>
        </div>
      </div>
      <p className="self-center text-sm">
        Need to create an account?{" "}
        <span
          className="text-gradient font-medium cursor-pointer"
          onClick={() => onRouteChange("signup")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Signin;
