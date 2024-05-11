"use client";

import React, { useState, useContext } from "react";
import styles from "./auth.module.scss";
import Button from "../common/Button";
import Image from "next/image";
import { OnboardingContext } from "@/app/(onboarding)/page";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { ConnectButton } from "thirdweb/react";
// import { client } from "./../../../lib/client";
// import {
//   generatePayload,
//   isLoggedIn,
//   login,
//   logout,
// } from "./../../connect-button/actions/auth";
import { handleLogin } from "@/app/api/user";
import { useRouter } from "next/navigation";

const Signin = () => {
  const {
    onChange,
    onRouteChange,
    onReset,
    onTabChange,
    setPublicAddress,
    state: { activeTab },
  } = useContext(OnboardingContext);

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome Back👋🏼</h1>
        <p className={styles.desc}>Please signin to your account</p>
      </div>

      <div>
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
            <Image src="/icons/dollar.png" alt="icon" width={36} height={36} />
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
        <ConnectButton />
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
