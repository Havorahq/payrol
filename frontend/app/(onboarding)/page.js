"use client";

import React, { useState, createContext } from "react";
import styles from "./onboarding.module.scss";
import Image from "next/image";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";
import Onboard from "../components/auth/Onboard";
import Home from "../dashboard/page";
import Link from "next/link";

import { FaPlus } from "react-icons/fa6";
// import {
//   CONTRACT_ADDRESS,
//   TOKEN_CONTRACT_ADDRESS,
// } from "../smart-contract/constants";
// import CONTRACT_ABI from "../smart-contract/wordanamain-abi.json";
// import TOKEN_ABI from "../smart-contract/token-abi.json";
import { GlobalProvider } from "../context/GlobalContext";

export const OnboardingContext = createContext();

const Onboarding = () => {
  const [state, setState] = useState({
    route: "signin",
    email: "",
    firstName: "",
    lastName: "",
    businessName: "",
    businessEmail: "",
    activeTab: "business",
  });

  const {
    route,
    firstName,
    lastName,
    businessName,
    businessEmail,
    email,
    activeTab,
  } = state;
  console.log(state);

  const renderPages = () => {
    switch (route) {
      case "signin":
        return <Signin />;
        break;
      case "signup":
        return <Signup />;
        break;
      case "onboard":
        return <Onboard />;
        break;

      case "dashboard":
        return <Home />;
        break;
      default:
        return <Signin />;
        break;
    }
  };

  const onRouteChange = (value) => {
    setState((state) => ({
      ...state,
      route: value,
    }));
  };

  const onTabChange = (value) => {
    console.log(value);
    setState((state) => ({
      ...state,
      activeTab: value,
    }));
  };

  // const setPublicAddress = (value) => {
  //   console.log(value);
  //   setState((state) => ({
  //     ...state,
  //     publicAddress: value,
  //   }));
  // };

  const onReset = () => {
    setState((state) => ({
      ...state,
      email: "",

      firstName: "",
      lastName: "",
      businessName: "",
      businessEmail: "",
    }));
  };

  const onChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        onChange,
        onRouteChange,
        onTabChange,
        onReset,
        state,
      }}
    >
      <GlobalProvider>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={`x-axis gap-1 ${styles.brandContainer}`}>
              <Image
                src="/icons/brandLogo.png"
                alt="Brand icon"
                width={50}
                height={50}
              />
              <h1>Xalari</h1>
            </div>
            <div>
              <p className={styles.title}>
                Payroll
                Management on the
                blockchain!
              </p>
              <p className={styles.desc}>
                Revolutionize Payroll Management with Blockchain Technology!
                Discover a secure, transparent, and efficient way to handle
                payroll, ensuring accuracy, trust, and simplicity for businesses
                of all sizes.
              </p>
            </div>
            <div className={styles.asset}>
              <Image
                src="/images/calculator.png"
                alt="Calculator image"
                width={370}
                height={350}
              />
            </div>
          </div>
          <div className={styles.right}>{renderPages()}</div>
        </div>
      </GlobalProvider>
    </OnboardingContext.Provider>
  );
};

export default Onboarding;
