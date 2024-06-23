"use client";

import Button from "../../components/common/button/Button";
import Wrapper from "../../components/wrapper/Wrapper";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { capitalizeFirst } from "../../../plugins/utils";
import useContractData from "@/app/hooks/useContractData";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { handleEmployeeEnterContract } from "@/app/api/user";
import useUserData from "@/app/hooks/useUserData";
import { useContractEvent, useAccount, useContractWrite } from "wagmi";
import fixedAbi from "@/lib/fixedRate.json";
import paygAbi from "@/lib/payg.json";
import Modal from "../../components/common/modal/Modal";
import { useRouter } from "next/navigation";

const ContractDetail = () => {
  function getLastWordAfterSlash(url) {
    const match = url.match(/\/([^\/]+)\/?$/);
    return match ? match[1] : null;
  }

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const id = getLastWordAfterSlash(pathname);
  const [contract, setContract] = useState(null);
  const { allContract, isLoading, error, specificContract } =
    useContractData(id);
  const [acceptingPaymentClicked, setAcceptingPaymentClicked] = useState(false);
  const { address } = useAccount();
  const [isEmployer, setIsEmployer] = useState(true);
  const { userData } = useUserData();
  const [contractWriteParams, setContractWriteParams] = useState();
  const localContractInfo = JSON.parse(localStorage.getItem("currentContract"));

  const {
    data: contractHash,
    error: contractError,
    isLoading: contractLoading,
    write: enterAgreement,
    isSuccess: contractSuccess,
  } = useContractWrite({
    address: localContractInfo.contract_address,
    abi: localContractInfo.contract_type === "fixed" ? fixedAbi : paygAbi,
    functionName: "employeeEnterContract",
  });

  const acceptOnDb = async () => {
    setAcceptingPaymentClicked(true);
    try {
      const res = await handleEmployeeEnterContract(id, address);
      console.log(res, "success yy");
      setAcceptingPaymentClicked(false);
      location.reload();
    } catch (e) {
      console.log(e, "error entering contract");
      setAcceptingPaymentClicked(false);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSendPayment = async (status) => {
    console.log("clicked", status);
    if (status == "send") {
      try {
        const res = await handleUpdatePayment(id, "pending");
        console.log(res, "success yy");
        setAcceptingPaymentClicked(false);
        location.reload();
      } catch (e) {
        console.log(e, "error sending contract");
        setAcceptingPaymentClicked(false);
      }
    } else if (status == "confirm") {
      try {
        const res = await handleUpdatePayment(id, "confirmed");
        console.log("confirmed");
        openModal();
      } catch (e) {
        console.log(e, "error sending contract");
        setAcceptingPaymentClicked(false);
      }
    }
  };

  const handleEnterAgreement = async () => {
    enterAgreement({
      args: [address],
    });
  };

  useEffect(() => {
    if (contractSuccess) {
      acceptOnDb();
    }
  }, [contractSuccess]);

  useEffect(() => {
    if (id && allContract) {
      const foundContract = allContract.find((contract) => contract.id === id);
      setContract(foundContract);
    }
  }, [id, allContract]);

  useEffect(() => {
    if (userData) {
      setIsEmployer(userData.user_type === "business");
    }
  }, [userData]);
  return (
    <Wrapper>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="padded">
          <h2>All done!🎉</h2>
          <p>You have Confirmed your payment! </p>
          <Button
            label="Back to Home"
            onClick={() => router.push("/dashboard")}
          />
        </div>
      </Modal>
      <div style={{ padding: 50 }}>
        <h1>Contract Details📄</h1>
        <p className={styles.desc}>Details of your contract below</p>
        {/* <Image src="/images/step_5.png" alt='step' width={540} height={7} /> */}
        <div className={`${styles.hr} py-1 mt-1`}>
          <p className="label">Contract Type</p>
          <p className="text-medium w-70 greyText">
            {capitalizeFirst(
              specificContract ? specificContract[0].contract_type : ""
            )}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Employee Email</p>
          <p className="text-medium w-70 greyText">
            {specificContract ? specificContract[0].employee_id : ""}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Job Title</p>
          <p className="text-medium w-70 greyText">
            {specificContract ? specificContract[0].job_title : ""}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Job Description</p>
          <p className="text-medium w-70 greyText">
            {specificContract ? specificContract[0].job_description : ""}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Rate ($) </p>
          <p className="text-medium w-70 greyText">
            {specificContract ? specificContract[0].payment : ""}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Employee Wallet Address </p>
          <p className="text-medium w-70 greyText">
            {specificContract ? specificContract[0].payment_address : ""}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Contract Status</p>
          <p className="text-medium w-70 greyText">
            {specificContract ? specificContract[0].status : ""}
          </p>
        </div>
        {isEmployer && (
          <div>
            {specificContract &&
              specificContract[0].status === "active" &&
              specificContract[0].payment_status !== "pending" &&
              specificContract[0].payment_status !== "active" && (
                <div className="my-half">
                  <p className="label">Payment Hash</p>
                  <input
                    type="text"
                    placeholder="Submit Blockchain payment Hash "
                  />
                </div>
              )}
          </div>
        )}

        {!isEmployer && (
          <div>
            {acceptingPaymentClicked ? (
              <p>Processing acceptance...</p>
            ) : (
              <div>
                {specificContract &&
                  specificContract[0].status === "pending" && (
                    <Button
                      label="Accept Contract"
                      onClick={() => {
                        handleEnterAgreement();
                      }}
                    />
                  )}
              </div>
            )}
          </div>
        )}

        {isEmployer && (
          <div>
            {specificContract &&
              specificContract[0].status === "active" &&
              specificContract[0].payment_status !== "pending" &&
              specificContract[0].payment_status !== "active" && (
                <Button
                  label="Submit Payment Hash"
                  onClick={() => {
                    handleSendPayment("send");
                  }}
                />
              )}
          </div>
        )}

        {console.log({ isEmployer })}

        {!isEmployer && (
          <div>
            {specificContract &&
              specificContract[0].status === "active" &&
              specificContract[0].payment_status === "pending" && (
                <Button
                  label="Confirm Payment"
                  onClick={() => {
                    handleSendPayment("confirm");
                  }}
                />
              )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ContractDetail;
