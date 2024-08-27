import React, { useState, useContext, useEffect, Suspense, lazy } from "react";
import { OnboardingContext } from "../../contexts/OnboardingContext";
import Button from "../common/Button";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { findUser } from "../../api/helper-functions";
import { DynamicWidget } from "../../../lib/dynamic";

const Signin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(OnboardingContext);

  const { user } = useDynamicContext();
  const [userExist, setUserExist] = useState("");

  console.log("Logged in user", user);
  const router = useRouter();

  const fetchUserData = async () => {
    if (user && user.email) {
      try {
        const fetchedUser = await findUser(user.email);
        setUserExist(
          fetchedUser?.data?.status === 200 ? "exists" : "not-found"
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  fetchUserData();

  if (!context) {
    return null; // Or handle the case where context is undefined
  }

  const { onRouteChange } = context;

  // If the user exists, route to the dashboard
  if (userExist === "exists") {
    router.push("/dashboard");
  } else if (userExist === "not-found") {
    onRouteChange("signup");
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col m-0 px-8 py-1 h-fit justify-center overflow-y-scroll gap-16">
          <div className="flex flex-col items-center">
            <h1>Welcome 👋🏼</h1>
            <p className="text-sm">Please sign in to your account </p>

            <p className="mt-2 text-gray-400 text-xs">
              You will be redirected to the sign up page if you don&apos;t have
              an account
            </p>
            <div className="flex justify-center mt-8">
                <DynamicWidget
                  innerButtonComponent={
                    <button>Sign In with Wallet or Email</button>
                  }
                ></DynamicWidget>
              {/* <Button>
              </Button> */}
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
      </Suspense>
    </>
  );
};

export default Signin;
