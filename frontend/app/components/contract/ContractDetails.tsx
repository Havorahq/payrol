"use client";

import React, { useContext, useEffect, useState } from "react";
import Button from "../common/Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import moment from "moment";
import { ContractContext } from "@/app/contexts/ContractContext";
import Modal from "../common/Modal";
import { useRouter } from "next/navigation";
import { capitalizeFirstWord } from "@/plugins/utils";
import { useUserData } from "@/app/hooks/useUserData";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useWatchContractEvent, useWriteContract } from "wagmi";
const factoryAbi = require("@/lib/contract/factoryAbi.json");
import { bscTestnet } from "viem/chains";
import { createContract } from "@/app/api/helper-functions";

const ContractDetails: React.FC = () => {
  const { onChange, handleNext, handlePrev, state } =
    useContext(ContractContext)!;

  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const { primaryWallet } = useDynamicContext();

  const { writeContract } = useWriteContract();

  const [isOpen, setIsOpen] = useState(false);
  const { userData, isLoading: userLoading, error } = useUserData();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Use the publicClient to read data from the smart contract
  // const readFunction = async () => {
  //   const publicClient: any = await primaryWallet?.connector?.getPublicClient();
  //   const result = await publicClient.readContract({
  //     address: "CONTRACT_ADDRESS",
  //     abi: factoryAbi,
  //     functionName: "someReadFunction",
  //     args: [],
  //   });
  //   return result;
  // };\

  useWatchContractEvent({
    address: "0x2EEa730fdf90665c9FF8F328eA92A862D9Da631F",
    abi: factoryAbi,
    eventName: "FixedRateAgreementDeployed",
    onLogs(logs) {
      const newLogs = logs as unknown as any[];
      const createdContractAddress = newLogs[0]?.args?.contractAddress;
      const {
        contractType,
        employeeEmail,
        endDate,
        jobDescription,
        jobTitle,
        milestoneRates,
        milestoneTitle,
        monthlyRate,
        startDate,
      } = state;
      const employerEmail = userData?.data?.data?.email;
      const status: string = "Pending";
      const payment_status: string = "Pending";

      createContract(
        contractType,
        employerEmail,
        employeeEmail,
        jobTitle,
        jobDescription,
        monthlyRate,
        status,
        payment_status,
        milestoneTitle,
        milestoneRates,
        startDate,
        endDate,
        createdContractAddress
      ).then(() => {
        openModal();
      });
    },
  });

  useWatchContractEvent({
    address: "0x2EEa730fdf90665c9FF8F328eA92A862D9Da631F",
    abi: factoryAbi,
    eventName: "PayAsYoGoAgreementDeployed",
    onLogs(logs) {
      console.log("New logs2!", logs);
      const newLogs = logs as unknown as any[];
      const createdContractAddress = newLogs[0]?.args?.contractAddress;
      const {
        contractType,
        employeeEmail,
        endDate,
        jobDescription,
        jobTitle,
        milestoneRates,
        milestoneTitle,
        monthlyRate,
        startDate,
      } = state;
      const employerEmail = userData?.data?.data?.email;
      const status: string = "Pending";
      const payment_status: string = "Pending";

      createContract(
        contractType,
        employerEmail,
        employeeEmail,
        jobTitle,
        jobDescription,
        monthlyRate,
        status,
        payment_status,
        milestoneTitle,
        milestoneRates,
        startDate,
        endDate,
        createdContractAddress
      ).then(() => {
        setIsLoading(false)
        openModal();
      });
    },
  });

  const wormhole_ags = [
    "0x80aC94316391752A193C1c47E27D382b507c93F3",
    "0x9dcF9D205C9De35334D646BeE44b2D2859712A09",
    "0x68605AD7b15c732a30b1BbC62BE8F2A509D74b4D",
  ];

  const deployFixedAgreement = async () => {
    const walletClient: any = await primaryWallet?.connector?.getWalletClient();

    // Use the walletClient to write data to the smart contract
    const { hash, loading, error } = await walletClient.writeContract({
      address: "0x2EEa730fdf90665c9FF8F328eA92A862D9Da631F",
      abi: factoryAbi,
      functionName: "createNewFixedRateAgreement",
      args: [
        "johnson", // employer id
        "jj", // employee id
        "0x8810df59BE2F2e585F8085586eB70340f3E7E103", // employer address,
        "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda", // usdt address
        1000,
        ...wormhole_ags,
      ],
      chain: bscTestnet || walletClient.chain,
    });

    setIsLoading(true);

    return hash;
  };

  const deployPAYGAgreement = async () => {
    const walletClient: any = await primaryWallet?.connector?.getWalletClient();

    // Use the walletClient to write data to the smart contract
    const { hash, loading, error } = await walletClient.writeContract({
      address: "0x2EEa730fdf90665c9FF8F328eA92A862D9Da631F",
      abi: factoryAbi,
      functionName: "createNewFixedRateAgreement",
      args: [
        "employer@employer.com",
        "employee@employee.com",
        "0xE08686958FF334A5422df17FaF05dd989e779FfA",
        "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda",
        "state.monthlyRate",
      ],
    });
    setIsLoading(true);
    return hash;
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async () => {
    if (!primaryWallet || !userData?.data) {
      return console.error("user not loaded yet");
    }
    setIsLoading(true)

    const {contractType} = state;

    try {
      if (state.contractType === "fixed") {
        await deployFixedAgreement();
      } else if (contractType.toLowerCase() === "pay as you go") {
        await deployPAYGAgreement();
      }
    } catch {
      console.error("error creating contract");
      alert("error creating contract");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-8">
          <p className="text-3xl text-black font-semibold font-sharp-grotesk">
            Congratulations!🎉
          </p>
          <p className="text-sm text-[#8F9299] font-dm-sans mb-4">
            You’ve successfully created a contract
          </p>
          <Button onClick={() => router.push("/dashboard")} primary>
            Go to Dashboard
          </Button>
        </div>
      </Modal>
      <div className="flex flex-col m-8 lg:p-8 p-0 h-full justify-center gap-2">
        <span
          className="flex items-center gap-2 text-primary cursor-pointer mb-2"
          onClick={handlePrev}
        >
          <FaChevronLeft />
          <p className="text-xs">Previous</p>
        </span>
        <div className="flex flex-col items-start">
          <p className="font-semibold lg:text-4xl text-3xl">
            Contract Details 📄
          </p>
          <p className="text-xs font-light text-grey">
            Details of your contract below
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="py-1 my-1 border-b">
            <p className="text-md text-grey-500 font-medium">Contract Type</p>
            <p className="text-sm text-grey">
              {capitalizeFirstWord(state?.contractType?.toUpperCase())}
            </p>
          </div>
          <div className="py-1 my-1 border-b">
            <p className="text-md text-grey-500 font-medium">Employee Email</p>
            <p className="text-sm text-grey">{state?.employeeEmail}</p>
          </div>
          <div className="py-1 my-1 border-b">
            <p className="text-md text-grey-500 font-medium">Job Title</p>
            <p className="text-sm text-grey">{state?.jobTitle}</p>
          </div>
          <div className="py-1 my-1 border-b">
            <p className="text-md text-grey-500 font-medium">Job Description</p>
            <p className="text-sm text-grey">{state?.jobDescription}</p>
          </div>
          <div className="py-1 my-1 border-b">
            <p className="text-md text-grey-500 font-medium">Start Date</p>
            <p className="text-sm text-grey">
              {state.startDate
                ? moment(state.startDate).format("YYYY-MM-DD")
                : "No end date selected"}
            </p>
          </div>
          <div className="py-1 my-1 border-b">
            <p className="text-md text-grey-500 font-medium">End Date</p>
            <p className="text-sm text-grey">
              {state.endDate
                ? moment(state.endDate).format("YYYY-MM-DD")
                : "No end date selected"}
            </p>
          </div>
          <div className="py-1 my-1 border-b">
            <p className="text-md text-grey-500 font-medium">Monthly Rate</p>
            <p className="text-sm text-grey my-2">{state?.monthlyRate}</p>
          </div>
          {/* <div className="py-1 my-1 border-b">
            <p className="text-md text-grey-500 font-medium">Wallet Address</p>
            <p className="text-sm text-grey my-2">{state?.walletAddress}</p>
          </div> */}
          {/* <input
          type="date"
          name="endDate"
          value={state.endDate}
          onChange={onChange}
          className="p-2 border border-gray-300 rounded"
        /> */}
        </div>
        <div className="flex justify-between mt-8">
          {/* 
          TODO: 
          call createNewPayAsYouGoAgreement for pay as you go contract
          call createNewFixedRateAgreement for fixed rate contract
          call employeeEnterContract(address _paymentAddress) to enter contract as employee
          */}

          <Button
            onClick={() => handleSubmit()}
            isLoading={isLoading}
            // disabled={!state.startDate || !state.endDate}
            primary
          >
            Create Contract
          </Button>
        </div>
      </div>
    </>
  );
};

export default ContractDetails;
