"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "./contractType.module.scss";
import Button from "../common/button/Button";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { ContractContext } from "@/app/create-contract/page";

const Payments = () => {
  const {
    handleNext,
    handlePrev,
    onChange,
    state: { monthlyRate, milestoneTitles, milestoneRates },
  } = useContext(ContractContext);
  const [mile, setMile] = useState(false);

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
      <div className="w-100">
        <h1>Payments Schedule</h1>
        <p className={styles.desc}>
          Enter the amount for the role below
        </p>
        {/* <Image src="/images/step_4.png" alt='step' width={450} height={7} /> */}
      </div>
      <div className="my-half w-100">
        <label htmlFor="">Monthly Rate</label>
        <div className="inputContainer x-axis">
          <select name="" id="">
            <option value="">USDT</option>
            <option value="">USDC</option>
          </select>
          <input
            type="text"
            name="monthlyRate"
            value={monthlyRate}
            placeholder="1000"
            onChange={onChange}
            // required
          />
        </div>
      </div>
      <Button label="Continue" onClick={handleNext} disabled={!monthlyRate} />
    </div>
  );
};

export default Payments;
