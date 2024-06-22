"use client";

import React, { useState, useContext, useEffect } from "react";
import styles from "./auth.module.scss";
import Button from "../common/button/Button";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import { useAccount } from "wagmi";
import { OnboardingContext } from "@/app/(onboarding)/page";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { handleLogin } from "@/app/api/user";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (address) {
          const userExist = await findUser(address);
          if (userExist.data.status === 200) {
            router.push("/");
          } else {
            onRouteChange("onboard");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address]);

  // Render loading state while fetching data
  if (isLoading) {
    return (
      <div style={{ width: "100px", margin: "auto", display: "block" }}>
        <ClipLoader color="#52bf" size={100} />
      </div>
    ); // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <div className={styles.container}>
      <div className="center-vertical">
        <h1>Welcome 👋🏼</h1>

        <p className={styles.desc}>Please Create an account</p>
        <p className="text-medium">
          You will be signed in if you already have an account
        </p>
        <div className="">
          <div className="x-axis gap-1 my-1">
            <div
              className={`x-axis ${styles.tab} ${
                activeTab === "business" ? styles.tabActive : styles.tabInactive
              }`}
              onClick={() => {
                onTabChange("business");
                onReset();
              }}
            >
              <Image
                src="/icons/dollar.png"
                alt="icon"
                width={36}
                height={36}
              />
              <div>
                <p className={styles.tabTitle}>Business</p>
                <p className={styles.tabDesc}>Sign In As a Business</p>
              </div>
              {/* <Image src='/icons/check.png' className={styles.check} alt="icon" width={15} height={15} /> */}
            </div>
            <div
              className={`x-axis ${styles.tab} ${
                activeTab === "employee" ? styles.tabActive : styles.tabInactive
              }`}
              onClick={() => {
                onTabChange("employee");
                onReset();
              }}
            >
              <Image
                src="/icons/employee.png"
                alt="icon"
                width={36}
                height={36}
              />
              <div>
                <p className={styles.tabTitle}>Employee</p>
                <p className={styles.tabDesc}>Sign In As an Employee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="center">
        <ConnectButton />
      </div>

      <p className={styles.prompt}>
        Already have an account?{" "}
        <span className={styles.action} onClick={() => onRouteChange("signin")}>
          Signin
        </span>
      </p>
    </div>
  );
};

export default Signin;
