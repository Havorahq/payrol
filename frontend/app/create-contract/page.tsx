"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import Image from "next/image";
import moment from "moment";
import ContractType from "../components/contract/ContractType";
import Personal from "../components/contract/Personal";
import RoleDetails from "../components/contract/RoleDetails";
import Payments from "../components/contract/Payments";
import Wallet from "../components/contract/Wallet";
import ContractDetails from "../components/contract/ContractDetails";
import { ContractContext, ContractProvider } from "../contexts/ContractContext";
import Swal from "sweetalert2";

const Contract: React.FC = () => {
  const context = useContext(ContractContext)

  if (!context) {
    return <div>Error: ContractContext not found</div>;
  }

  const { setState, state } = context;

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
    {
      title: "Contract Details",
      description:
        "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "wallet.png",
    },
  ];


  const renderStep = () => {
    switch (state.step) {
      case 0:
        return <ContractType setState={setState} />;
      case 1:
        return <Personal />;
      case 2:
        return <RoleDetails />;
      case 3:
        return <Payments />;
      case 4:
        return <ContractDetails />;
      default:
        return <ContractType setState={setState} />;
    }
  };

  return (
    <>
      <div className="flex justify-center h-full w-full">
        <div className="flex h-full w-4/5 flex-col justify-evenly p-8 px-16 text-white md:w-1/2 primary-bg overflow-hidden-forced">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/brandLogo.png"
              alt="Brand icon"
              width={50}
              height={50}
            />
            <h1 className="text-2xl font-bold">Xalari</h1>
          </div>
          <div>
            <p className="text-6xl font-semibold">
              {details[state.step]?.title}
            </p>
            <p className="text-md font-light mt-2">
              {details[state.step]?.description}
            </p>
          </div>
          <div className="self-center">
            <Image
              src={`/images/${details[state.step]?.asset}`}
              alt="Calculator image"
              width={340}
              height={300}
            />
          </div>
        </div>
        <div className="h-full w-full authBg text-black p-8 pb-12 md:w-1/2 overflow-forced">
          {renderStep()}
        </div>
      </div>
    </>
  );
};

const ContractPage = () => (
  <ContractProvider>
    <Contract />
  </ContractProvider>
)

export default ContractPage;
