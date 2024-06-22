"use client";

import React, { useContext, useState } from "react";
import styles from "./auth.module.scss";
import Button from "../common/button/Button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { OnboardingContext } from "@/app/(onboarding)/page";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleSignUpServer } from "@/app/api/user";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import Input from "../common/input/Input";

const Onboard = () => {
  const {
    onChange,
    onRouteChange,
    onReset,

    state: {
      firstName,
      lastName,
      businessName,
      businessEmail,
      email,
      activeTab,
    },
  } = useContext(OnboardingContext);

  const router = useRouter();
  const account = useAccount();
  const { address } = account;

  const handleSignUp = async () => {
    const user_type = activeTab;
    try {
      const { data, error } = await handleSignUpServer(
        user_type,
        firstName,
        lastName,
        email,
        businessName,
        businessEmail,
        address
      );

      if (error) {
        // Handle error
        console.error(error);
        alert("Error signing up ");
        return;
      }

      alert("Signed up successfully, Welcome on board");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled =
    firstName === "" &&
    lastName === "" &&
    businessName === "" &&
    businessEmail === "";

  return (
    <div className={styles.container}>
      <div className={styles.brandContainer}>
        <h1>Sign Up👋🏼</h1>
        {/* <p className={styles.desc}>Create an account below</p> */}
      </div>

      <div className="my-1 w-100">
        <div>
          <div className="my-1">
            <label htmlFor="firstName">First Name</label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="Enter your first name"
              onChange={onChange}
              required
            />
          </div>
          <div className="my-1">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder="Enter your last name"
              onChange={onChange}
              required
            />
          </div>
          {activeTab === "employee" && (
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Email Address"
                onChange={onChange}
                required
              />
            </div>
          )}
          {activeTab === "business" && (
            <div>
              <div className="my-1">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={businessName}
                  placeholder="Enter business name"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="my-1">
                <label htmlFor="businessEmail">Business Email</label>
                <input
                  type="email"
                  id="businessEmail"
                  name="businessEmail"
                  value={businessEmail}
                  placeholder="Enter business email"
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          )}
          <Button
            label="Continue"
            onClick={handleSignUp}
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Onboard;
