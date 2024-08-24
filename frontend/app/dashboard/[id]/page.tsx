"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../components/common/Button";
import Wrapper from "../../components/wrapper/Wrapper";
import Modal from "../../components/common/Modal";
import { capitalizeFirst } from "../../../plugins/utils";
import useContractData from "../../hooks/useContractData";
import useUserData from "../../hooks/useUserData";
import { useWriteContract } from "wagmi";
import { contractAddress } from "../../../lib/contract/contract";

const ContractDetail = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [contract, setContract] = useState<any>(null);
  const [isEmployer, setIsEmployer] = useState(true);
  const [acceptingPaymentClicked, setAcceptingPaymentClicked] = useState(false);
  const { userData, isLoading: userLoading, error: userErroer } = useUserData();
  const { contracts, isLoading, error } = useContractData();
  const abi = require("../../../lib/contract/contract_abi.json");
  const { writeContract } = useWriteContract();

  useEffect(() => {
    if (id && contracts) {
      const foundContract = contracts.find((contract) => contract.id === id);
      setContract(foundContract);
    }
  }, [id, contracts]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSendPayment = (status: string) => {
    console.log("clicked", status);
    if (status === "send" || status === "confirm") {
      openModal();
    }
  };

  const handleEnterAgreement = () => {
    console.log("Agreement entered");
    openModal();
  };

  const contractFunction = () => {
    return writeContract({
      abi,
      address: contractAddress,
      functionName: "transferFrom",
      args: [
        "0xd2135CfB216b74109775236E36d4b433F1DF507B",
        "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
      ],
    });
  };

  return (
    <>
      <button onClick={() => contractFunction()}></button>
      <Wrapper>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-xl font-bold">All done! 🎉</h2>
            <p className="text-sm text-gray-500 my-2">
              You have Confirmed your payment!
            </p>
            <Button
              label="Back to Home"
              onClick={() => router.push("/dashboard")}
            />
          </div>
        </Modal>
        <div className="p-10 text-[#131414] mt-3">
          <h1 className="text-2xl font-bold text-left mb-4">
            Contract Details 📄
          </h1>
          <p className="text-gray-600 mt-2">Details of your contract below</p>
          <div className="border-b py-4">
            <p className="font-medium">Contract Type</p>
            <p className="text-gray-600">
              {capitalizeFirst(contract ? contract.contract_type : "")}
            </p>
          </div>
          <div className="border-b py-4">
            <p className="font-medium">Employee Email</p>
            <p className="text-gray-600">
              {contract ? contract.employee_id : ""}
            </p>
          </div>
          <div className="border-b py-4">
            <p className="font-medium">Job Title</p>
            <p className="text-gray-600">
              {contract ? contract.job_title : ""}
            </p>
          </div>
          <div className="border-b py-4">
            <p className="font-medium">Job Description</p>
            <p className="text-gray-600">
              {contract ? contract.job_description : ""}
            </p>
          </div>
          <div className="border-b py-4">
            <p className="font-medium">Rate ($)</p>
            <p className="text-gray-600">{contract ? contract.payment : ""}</p>
          </div>
          <div className="border-b py-4">
            <p className="font-medium">Employee Wallet Address</p>
            <p className="text-gray-600">
              {contract ? contract.payment_address : ""}
            </p>
          </div>
          <div className="border-b py-4">
            <p className="font-medium">Contract Status</p>
            <p className="text-gray-600">
              {contract ? capitalizeFirst(contract.status) : ""}
            </p>
          </div>
          {isEmployer &&
            contract &&
            contract.status === "active" &&
            contract.payment_status !== "pending" &&
            contract.payment_status !== "active" && (
              <div className="my-2">
                <p className="font-medium">Payment Hash</p>
                <input
                  type="text"
                  placeholder="Submit Blockchain payment Hash"
                  className="w-full border rounded p-2"
                />
                <Button
                  label="Submit Payment Hash"
                  onClick={() => handleSendPayment("send")}
                  style="mt-2"
                />
              </div>
            )}
          {!isEmployer && (
            <div>
              {acceptingPaymentClicked ? (
                <p>Processing acceptance...</p>
              ) : (
                <div>
                  {contract && contract.status === "pending" && (
                    <Button
                      label="Accept Contract"
                      onClick={handleEnterAgreement}
                    />
                  )}
                </div>
              )}
            </div>
          )}
          {!isEmployer &&
            contract &&
            contract.status === "active" &&
            contract.payment_status === "pending" && (
              <Button
                label="Confirm Payment"
                onClick={() => handleSendPayment("confirm")}
              />
            )}
        </div>
      </Wrapper>
    </>
  );
};

export default ContractDetail;
