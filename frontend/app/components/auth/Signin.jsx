"use client";

import React, { useState, useContext } from "react";
import styles from "./auth.module.scss";
import Button from "../common/Button";
import Image from "next/image";
import { OnboardingContext } from "@/app/onboarding/page";
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
        {" "}
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
