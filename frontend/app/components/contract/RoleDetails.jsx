"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "./contractType.module.scss";
import Button from "../common/button/Button";
import DatePicker from "react-datepicker";
import { FaArrowDown } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { ContractContext } from "@/app/create-contract/page";

const RoleDetails = () => {
  const {
    handleNext,
    handlePrev,
    onChange,
    onFromDateChange,
    onToDateChange,
    state: { jobTitle, jobDescription, startDate, endDate },
  } = useContext(ContractContext);

  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  // const onFromDateChange = date => {
  //     const value = moment(new Date(date)).format('YYYY-MM-DD')

  //     if (value !== "1970-01-01") {
  //         setStartDate(value)
  //     } else {
  //         setStartDate("")
  //     }
  // }

  // const onToDateChange = date => {
  //     const value = moment(new Date(date)).format('YYYY-MM-DD')

  //     if (value !== "1970-01-01") {
  //         setEndDate(value)
  //     } else {
  //         setEndDate("")
  //     }
  // }

  const isDisabled = !jobTitle;

  return (
    <div className={`${styles.section}`}>
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
        <h1>Role Details</h1>
        <p className={styles.desc}>Enter the details of the role below</p>
        {/* <Image src="/images/step_3.png" alt='step' width={450} height={7} /> */}
      </div>
      <div className="w-100">
        <div className="my-1">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobTitle}
            placeholder="Solidity Engineer"
            onChange={onChange}
          />
        </div>
        <div className="my-1">
          <label htmlFor="jobDescription">
            Job Description{" "}
            <span className="greyText text-medium">(Optional)</span>
          </label>
          <textarea
            type="text"
            id="jobDescription"
            name="jobDescription"
            value={jobDescription}
            placeholder="Develop smart contrac..."
            onChange={onChange}
          />
        </div>
        <div className="x-axis gap-1">
          <div className="w-100">
            <label htmlFor="">Start date</label>
            <div className={styles.datePickerContainer}>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                onChange={(date) => onFromDateChange(date)}
                className={styles.datePicker}
                placeholderText="dd-mm-yy"
                minDate={endDate || new Date()}
                isClearable={false}
                wrapperClassName="datePicker"
                name="startDate"
                selectsStart
                selected={startDate}
              />
              <FaCaretDown className={styles.icon} />
            </div>
          </div>
          <div className="w-100">
            <label htmlFor="">End Date</label>
            <div className={styles.datePickerContainer}>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                onChange={(date) => onToDateChange(date)}
                selected={endDate}
                minDate={startDate}
                isClearable={false}
                className={styles.datePicker}
                wrapperClassName="datePicker"
                name="endDate"
                selectsEnd
                placeholderText="dd-mm-yy"
              />
              <FaCaretDown className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
      <Button label="Continue" onClick={handleNext} disabled={isDisabled} />
      {/* <Button label="Continue" style="btn-primary" /> */}
    </div>
  );
};

export default RoleDetails;
