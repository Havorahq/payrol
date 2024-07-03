import React, { useState, useContext, useEffect } from "react";
import { OnboardingContext } from "../../contexts/OnboardingContext";
import Button from "../common/Button";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { findUser } from "../../api/helper-functions";
const Signin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(OnboardingContext);

  // const account = useAccount();
  // const { address } = account;
  // const { disconnect } = useDisconnect();
  const router = useRouter();

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchData = async () => {
  //     try {
  //       if (address) {
  //         const userExist: any = await findUser(address);

  //         if (userExist.data.status === 200) {
  //           router.push("/dashboard");
  //         } else {
  //           disconnect();
  //           onRouteChange("signup");
  //         }
  //       } else {
  //         console.log("no address");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       // Handle error (e.g., show an error message)
  //     } finally {
  //       setIsLoading(false); // Mark loading as complete
  //     }
  //   };

  //   fetchData();
  // }, [address]);

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
        <div className="flex justify-center">{/* <ConnectButton /> */}</div>
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
