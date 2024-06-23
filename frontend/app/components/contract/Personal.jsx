"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "./contractType.module.scss";
import Button from "../common/button/Button";
import { ContractContext } from "@/app/create-contract/page";
import { EMAIL_REGEX } from "@/plugins/utils";

const Personal = () => {
  const {
    handleNext,
    handlePrev,
    onChange,
    state: { employeeName, employeeEmail },
  } = useContext(ContractContext);

  let emailError = false;
  if (employeeEmail && !EMAIL_REGEX.test(employeeEmail)) {
    emailError = true;
  } else {
    emailError = false;
  }

  return (
    <div className={styles.section}>
      <span className="w-100">
        <Image
          src="/icons/previous.png"
          alt="Learn More"
          className="cursor"
          width={71}
          height={18}
          onClick={handlePrev}
        />
      </span>
      <div className={styles.brandContainer}>
        <div className="w-100">
          <h1>Personal Details</h1>
          <p className={styles.desc}>
            Enter the personal details of the employee below
          </p>
          {/* <Image src="/images/step_2.png" alt='step' width={450} height={7} /> */}
        </div>
      </div>
      <div className=" w-100">
        <label htmlFor="">Employee Email</label>
        <input
          type="email"
          name="employeeEmail"
          value={employeeEmail}
          placeholder="johndoe@example.com"
          onChange={onChange}
          required
        />
        {emailError && (
          <span className="text-danger text-medium mt-1">
            Enter a vaild email address!
          </span>
        )}
      </div>
      <Button
        label="Continue"
        onClick={handleNext}
        disabled={emailError || !employeeEmail}
      />
    </div>
  );
};

export default Personal;
