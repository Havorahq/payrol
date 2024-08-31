"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "../../components/common/Button";
import Wrapper from "../../components/wrapper/Wrapper";
import Modal from "../../components/common/Modal";
import { capitalizeFirst, statusClass } from "../../../plugins/utils";
import useContractData from "../../hooks/useContractData";
import { useUserData } from "../../hooks/useUserData";
import { bscTestnet } from "viem/chains";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { acceptContract, getContractById } from "@/app/api/helper-functions";
import agreementAbi from "@/lib/contract/AgreementAbi.json";

const ContractDetail = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [contract, setContract] = useState<any>(null);
  const [acceptingPaymentClicked, setAcceptingPaymentClicked] = useState(false);
  const { userData, isLoading: userLoading, error: userErroer } = useUserData();
  const { contracts, isLoading, error } = useContractData();
  const { primaryWallet } = useDynamicContext();

  const enterContract = async () => {
    const walletClient: any = await primaryWallet?.connector?.getWalletClient();
    

    // Use the walletClient to write data to the smart contract
    const { hash, loading, error } = await walletClient.writeContract({
      address: contract.hash,
      abi: agreementAbi,
      functionName: "employeeEnterContract",
      chain: bscTestnet || walletClient.chain,
    });

    return hash;
  };

  const loadContract =async(id: string)=>{
    console.log(id, 'the id')
    if (!id) return
    const gottenContract = await getContractById(id)
    console.log(gottenContract, 'the gotten contract')
    setContract(gottenContract.data)
  }

  useEffect(() => {
    loadContract(id as string)
  }, [id]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSendPayment = (status: string) => {
    console.log("clicked", status);
    if (status === "send" || status === "confirm") {
      openModal();
    }
  };

  const handleEnterAgreement = async () => {
    try{
      console.log("Agreement entered");
      enterContract();
      await acceptContract(id as string)
      openModal();
    } catch(e){
      console.log(e)
    }
  };

  return (
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
      <div className="flex w-full h-full justify-center items-center">
        <div className="lg:w-1/2 w-full border shadow-lg bg-white rounded-xl p-8">
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
              <p className="text-gray-600">{contract ? contract.amount : ""}</p>
            </div>
            {/* <div className="border-b py-4">
              <p className="font-medium">Employee Wallet Address</p>
              <p className="text-gray-600">
                {contract ? contract.payment_address : ""}
              </p>
            </div> */}
            <div className="border-b py-4">
              <p className="font-medium">Contract Status</p>
              <p className="text-gray-600">
                {contract ? (
                  <span className={`${statusClass(contract?.status)}`}>
                    {capitalizeFirst(contract.status)}
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
            {contract?.status !== "Active" && (
              <div className="mt-8">
                <Button
                  primary
                  label="Accept Contract"
                  style="w-fit"
                  onClick={handleEnterAgreement}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ContractDetail;
