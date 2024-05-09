"use client";

import React, { useState, useContext } from "react";
import styles from "./auth.module.scss";
import Button from "../common/Button";
import Image from "next/image";
import { OnboardingContext } from "@/app/onboarding/page";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ConnectButton } from "thirdweb/react";
import { client } from "./../../../lib/client";
import {
  generatePayload,
  isLoggedIn,
  login,
  logout,
} from "./../../connect-button/actions/auth";
import { handleLogin } from "@/app/api/user";

const Signin = () => {
  const {
    onChange,
    onRouteChange,
    onReset,
    onTabChange,
    setPublicAddress,
    state: { email, activeTab },
  } = useContext(OnboardingContext);

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
        <ConnectButton
          client={client}
          auth={{
            isLoggedIn: async (address) => {
              console.log("checking if logged in!", { address });
              setPublicAddress(address);

              // Check if the address is in the database
              const { data, error } = await handleLogin(address);

              if (data) {
                return await isLoggedIn();
              } else {
                // If the address is not in the database, redirect to the signup page
                onRouteChange("signup");
                // return false;
              }
            },

            doLogin: async (params) => {
              console.log("logging in!");
              await login(params);
              return { success: true };
            },
            getLoginPayload: async ({ address }) =>
              generatePayload({ address }),
            doLogout: async () => {
              console.log("logging out!");
              await logout();
            },
          }}
        />
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
