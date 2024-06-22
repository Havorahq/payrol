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
              <option value="">BTC</option>
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
        <div
          className="x-axis my-1 dialog justify-between cursor"
          onClick={() => setMile((prev) => !prev)}
        >
          <p className="label">Milestones</p>
          <div>
            {mile ? (
              <FaChevronUp color="#717379" />
            ) : (
              <FaChevronDown color="#717379" />
            )}
          </div>
        </div>
        {mile ? (
          <div>
            <div className="x-axis justify-between">
              <p className="w-100 text-small">Add Milestone Below</p>
              <p className="text-base cursor">+</p>
            </div>
            <div className="my-half x-axis gap-1">
              <div className="w-100">
                <label>Title</label>
                <input type="text" placeholder="Enter Milestone Title" />
              </div>
              <div className="w-100">
                <label>Enter Rate</label>
                <div className="inputContainer x-axis w-100">
                  <select name="" id="">
                    <option value="">USDT</option>
                    <option value="">BTC</option>
                  </select>
                  <input type="text" placeholder="1000" />
                </div>
              </div>
            </div>
            <div className="my-half x-axis gap-1">
              <div className="w-100">
                <label htmlFor="">Title</label>
                <input type="text" placeholder="Enter Milestone Title" />
              </div>
              <div className="w-100">
                <label htmlFor="">Enter Rate</label>
                <div className="inputContainer x-axis w-100">
                  <select name="" id="">
                    <option value="">USDT</option>
                    <option value="">BTC</option>
                  </select>
                  <input type="text" placeholder="1000" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Button label="Continue" onClick={handleNext} />
      </form>
      {/* <Button label="Continue" style="btn-primary" /> */}
    </div>
  );
};

export default Payments;
