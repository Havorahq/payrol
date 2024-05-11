"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "./auth.module.scss";
import Button from "../common/Button";
import Image from "next/image";
import { OnboardingContext } from "@/app/(onboarding)/page";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { handleLogin } from "@/app/api/user";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { findUser } from "./../../api/user";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    onChange,
    onRouteChange,
    onReset,
    onTabChange,
    setPublicAddress,
    state: { activeTab },
  } = useContext(OnboardingContext);

  const account = useAccount();
  const { address } = account;
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (address) {
          const userExist = await findUser(address);
          console.log({ userExist, address });
          if (userExist.data.status === 200) {
            router.push("/");
          } else {
            disconnect();
            onRouteChange("signup");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., show an error message)
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    };

    fetchData();
  }, [address]);

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className="center-vertical">
        <h1>Welcome 👋🏼</h1>
        <p className={styles.desc}>Please signin to your account</p>
        <p style={{ marginTop: "10px" }}>
          You will be redirected to the sign up page if you dont have an account
        </p>
      <div className="center">
        <ConnectButton />
      </div>
      </div>

      <p className={styles.prompt}>
        Need to create an account?{" "}
        <span className={styles.action} onClick={() => onRouteChange("signup")}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Signin;
