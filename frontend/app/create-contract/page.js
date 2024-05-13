"use client";

import React, { createContext, useState } from "react";
import styles from "./contract.module.scss";
import Image from "next/image";
import moment from "moment";
import ContractType from "../components/contract/ContractType";
import Personal from "../components/contract/Personal";
import RoleDetails from "../components/contract/RoleDetails";
import Payments from "../components/contract/Payments";
import Wallet from "../components/contract/Wallet";
import ContractDetails from "../components/contract/ContractDetails";

export const ContractContext = createContext();

const Contract = () => {
  // const [step, setStep] = useState(0)
  const [state, setState] = useState({
    step: 0,
    contractType: "fixed",
    employeeName: "",
    employeeEmail: "",
    jobTitle: "",
    jobDescription: "",
    startDate: "",
    endDate: "",
    monthlyRate: "",
    milestoneTitles: [],
    milestoneRates: [],
    walletAddress: "",
    isPasswordShown: false,
  });

  const {
    step,
    contractType,
    employeeName,
    employeeEmail,
    jobTitle,
    jobDescription,
    startDate,
    endDate,
    monthlyRate,
    milestoneTitles,
    milestoneRates,
    walletAddress,
  } = state;

  console.log(state);

  const handleNext = () => {
    if (step < 6) {
      setState((state) => ({
        ...state,
        step: step + 1,
      }));
    }
  };

  const handlePrev = () => {
    setState((state) => ({
      ...state,
      step: step - 1,
    }));
  };

  const onChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onFromDateChange = (date) => {
    const value = moment(new Date(date)).format("YYYY-MM-DD");
    if (value !== "1970-01-01") {
      setState((state) => ({
        ...state,
        startDate: value,
      }));
    } else {
      setState((state) => ({
        ...state,
        startDate: "",
      }));
    }
  };

  const onToDateChange = (date) => {
    const value = moment(new Date(date)).format("YYYY-MM-DD");

    if (value !== "1970-01-01") {
      setState((state) => ({
        ...state,
        endDate: value,
      }));
    } else {
      setState((state) => ({
        ...state,
        endDate: "",
      }));
    }
  };

  const details = [
    {
      title: "Create a contract",
      description:
        "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "signing-contract.png",
    },
    {
      title: "Personal Details",
      description:
        "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "personal.png",
    },
    {
      title: "Role Details",
      description:
        "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "office-desk.png",
    },
    {
      title: "Payment Schedule",
      description:
        "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "payment.png",
    },
    // {
    //   title: "Wallet and Smart Contracts",
    //   description: "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
    //   asset: "wallet.png"
    // },
    {
      title: "Contract Details",
      description:
        "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "wallet.png",
    },
  ];

  const renderStep = () => {
    switch (step) {
      case 0:
        return <ContractType setState={setState} />;
        break;
      case 1:
        return <Personal />;
        break;
      case 2:
        return <RoleDetails />;
        break;
      case 3:
        return <Payments />;
        break;
      // case 4:
      //   return <Wallet />;
      //   break;
      case 4:
        return <ContractDetails />;
        break;
      default:
        return <ContractType />;
        break;
    }
  };

  return (
    <ContractContext.Provider
      value={{
        handleNext,
        handlePrev,
        onChange,
        onFromDateChange,
        onToDateChange,
        state,
      }}
    >
      <div className={styles.container}>
        <div className={styles.left}>
          <div className="x-axis gap-1">
            <Image
              src="/icons/xalariIcon.png"
              alt="Brand icon"
              width={50}
              height={50}
            />
            <h1>Xalari</h1>
          </div>
          <div>
            <p className={styles.title}>{details[step]?.title}</p>
            <p className={styles.desc}>{details[step]?.description}</p>
          </div>
          <div className={styles.asset}>
            <Image
              src={`/images/${details[step]?.asset}`}
              alt="Calculator image"
              width={340}
              height={300}
            />
          </div>
        </div>
        <div className={styles.right}>{renderStep()}</div>
      </div>
    </ContractContext.Provider>
  );
};

export default Contract;
