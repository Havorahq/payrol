"use client";

import React, { useContext, useState } from "react";
import Button from "../common/Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import moment from "moment";
import { ContractContext } from "@/app/contexts/ContractContext";
import Modal from "../common/Modal";
import { useRouter } from "next/navigation";
import { capitalizeFirstWord } from "@/plugins/utils";
import useUserData from "@/app/hooks/useUserData";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useWriteContract } from "wagmi";
const factoryAbi = require("@/lib/contract/factoryAbi.json");

const ContractDetails: React.FC = () => {
  const { onChange, handleNext, handlePrev, state } =
    useContext(ContractContext)!;

  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const { primaryWallet } = useDynamicContext();

  const { writeContract } = useWriteContract();

  const [isOpen, setIsOpen] = useState(false);
  const { userData, isLoading, error } = useUserData();
  const [user, setUser] = useState();

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
  // };

  const wormhole_ags = [
    "0x80aC94316391752A193C1c47E27D382b507c93F3",
    "0x9dcF9D205C9De35334D646BeE44b2D2859712A09",
    "0x68605AD7b15c732a30b1BbC62BE8F2A509D74b4D",
  ];

  const deployFixedAgreement = async () => {
    const walletClient: any = await primaryWallet?.connector?.getWalletClient();

    // Use the walletClient to write data to the smart contract
    const { hash, loading, error } = await walletClient.writeContract({
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      abi: factoryAbi,
      functionName: "createNewFixedRateAgreement",
      args: [
        "johnson", // employer id
        "jj", // employee id
        "account.address", // employer address,
        "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda", // usdt address
        "rate",
        ...wormhole_ags,
      ],
    });

    return hash;
  };

  const deployPAYGAgreement = async () => {
    const walletClient: any = await primaryWallet?.connector?.getWalletClient();

    // Use the walletClient to write data to the smart contract
    const { hash, loading, error } = await walletClient.writeContract({
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
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

    return hash;
  };

  // useContractEvent({
  //   address: contractAddress,
  //   abi: factoryAbi,
  //   eventName: "FixedRateAgreementDeployed",
  //   listener: async (eventNumber: any[]) => {
  //     const eventNum = eventNumber[0];
  //     state.contractAddress = eventNum.args.contractAddress;
  //     const { data: reqData, error: reqError } = await createContract(state);
  //     if (reqError) {
  //       return console.error(reqError, "contract creation error");
  //     }
  //     openModal();
  //   },
  // });

  // writeContract({
  //   abi: factoryAbi,
  //   address: "0x6b175474e89094c44da98b954eedeac495271d0f",
  //   functionName: "transferFrom",
  //   args: [
  //     "0xd2135CfB216b74109775236E36d4b433F1DF507B",
  //     "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
  //   ],
  // });

  // writeContract({
  //   abi: factoryAbi,
  //   address: contractAddress,
  //   eventName: "PayAsYoGoAgreementDeployed",
  //   listener: async (eventNumber: any[]) => {
  //     const eventNum = eventNumber[0];
  //     state.contractAddress = eventNum.args.contractAddress;
  //     const { data: reqData, error: reqError } = await createContract(state);
  //     if (reqError) {
  //       return console.error(reqError, "contract creation error");
  //     }
  //     openModal();
  //   },
  // });

  // writeContract({
  //   address: contractAddress,
  //   abi: factoryAbi,
  //   functionName: "createNewFixedRateAgreement",
  // });

  // writeContract({
  //   address: contractAddress,
  //   abi: factoryAbi,
  //   functionName: "createNewPayAsYouGoAgreement",
  // });

  // useEffect(() => {
  //   if (userData) {
  //     setUser(userData);
  //   }
  //   if (fixedContractSuccess) {
  //     console.log("fixed rate contract deployed", fixedContractSuccess);
  //   }

  //   if (paygContractSuccess) {
  //     console.log("PAYG contract deployed");
  //   }

  //   if (fixedContractError) {
  //     console.log(fixedContractError, "error deploying fixed contract");
  //   }

  //   if (paygContractError) {
  //     console.log(paygContractError, "error deploying payg contract");
  //   }
  // }, [
  //   fixedContractSuccess,
  //   paygContractSuccess,
  //   fixedContractError,
  //   paygContractError,
  //   userData,
  // ]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = () => {
    if (!primaryWallet) {
      return console.error("user not loaded yet");
    }
    if (state.contractType === "fixed") {
      deployFixedAgreement();
    } else if (state.contractType.toLowerCase() === "pay as you go") {
      deployPAYGAgreement();
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="mt-8">
          <p className="text-4xl font-bold">All Done! 🎉</p>
          <p className="text-xs font-light text-grey mb-14">
            You’ve successfully created a contract!
          </p>
          <Button onClick={() => router.push("/dashboard")} primary>
            Back to Home
          </Button>
        </div>
      </Modal>
      <div className="flex flex-col m-8 p-8 h-full justify-center gap-2">
        <span
          className="flex items-center gap-2 text-primary cursor-pointer"
          onClick={handlePrev}
        >
          <FaChevronLeft />
          <p className="text-xs">Previous</p>
        </span>
        <div className="flex flex-col items-start">
          <h1>Contract Details📄</h1>
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
            <p className="text-md text-grey-500 font-medium">Employee Name</p>
            <p className="text-sm text-grey">{state?.employeeName}</p>
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
          <div className="py-1 my-1 border-b">
            <p className="text-md text-grey-500 font-medium">Wallet Address</p>
            <p className="text-sm text-grey my-2">{state?.walletAddress}</p>
          </div>
          {/* <input
          type="date"
          name="endDate"
          value={state.endDate}
          onChange={onChange}
          className="p-2 border border-gray-300 rounded"
        /> */}
        </div>
        <div className="flex justify-between mt-4">
          {/* 
          TODO: 
          call createNewPayAsYouGoAgreement for pay as you go contract
          call createNewFixedRateAgreement for fixed rate contract
          call employeeEnterContract(address _paymentAddress) to enter contract as employee
          */}

          <Button
            onClick={() => handleSubmit()}
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
