"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "./contractType.module.scss";
import Button from "../common/Button";
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
      <Image
        src="/icons/previous.png"
        alt="Learn More"
        className="cursor"
        width={71}
        height={18}
        onClick={handlePrev}
      />
      <div>
        <h1>Payments Schedule</h1>
        <p className={styles.desc}>
          Enter the personal details of the employee below
        </p>
        {/* <Image src="/images/step_4.png" alt='step' width={450} height={7} /> */}
      </div>
      <form>
        <div className="my-half">
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
        <Button label="Continue" onClick={handleNext} />
      </form>
      {/* <Button label="Continue" style="btn-primary" /> */}
    </div>
  );
};

export default Payments;
