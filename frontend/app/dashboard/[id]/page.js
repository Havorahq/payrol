"use client";

import Button from "../../components/common/Button";
import Wrapper from "../../components/wrapper/Wrapper";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { capitalizeFirst } from "../../../plugins/utils";
import useContractData from "@/app/hooks/useContractData";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'
import { handleEmployeeEnterContract } from "@/app/api/user";
import {useAccount} from "wagmi";
import useUserData from "@/app/hooks/useUserData";

const ContractDetail = () => {

  function getLastWordAfterSlash(url) {
    const match = url.match(/\/([^\/]+)\/?$/);
    return match ? match[1] : null;
}

  const pathname = usePathname()
  const id = getLastWordAfterSlash(pathname);
  const [contract, setContract] = useState(null);
  const { allContract, isLoading, error, specificContract } = useContractData(id);
  const [acceptingPaymentClicked, setAcceptingPaymentClicked] = useState(false)
  const {address} = useAccount()
  const [isEmployer, setIsEmployer] = useState(true)
  const {userData} = useUserData()

  const handleAcceptance = async () => {
    setAcceptingPaymentClicked(true)
    try{
      const res = await handleEmployeeEnterContract(id, address)
      console.log(res, 'success yy')
      setAcceptingPaymentClicked(false)
      location.reload()
    } catch(e){
      console.log(e, 'error entering contract')
      setAcceptingPaymentClicked(false)
    }
  };

  useEffect(() => {
    if (id && allContract) {
      const foundContract = allContract.find((contract) => contract.id === id);
      setContract(foundContract);
    }
  }, [id, allContract]);

  useEffect(()=>{
    if (userData){
      setIsEmployer(userData.user_type === "business")
    }
  }, [userData])
  return (
    <Wrapper>
      <div style={{ padding: 50 }}>
        <h1>Contract Details📄</h1>
        <p className={styles.desc}>Details of your contract below</p>
        {/* <Image src="/images/step_5.png" alt='step' width={540} height={7} /> */}
        <div className={`${styles.hr} py-1 mt-1`}>
          <p className="label">Contract Type</p>
          <p className="text-small w-70 greyText">
            {capitalizeFirst(specificContract? specificContract[0].contract_type: '')}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Employee Name</p>
          <p className="text-small w-70 greyText">
            {capitalizeFirst(specificContract? specificContract[0].business_name: '')}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Employee Email</p>
          <p className="text-small w-70 greyText">{specificContract? specificContract[0].employee_id: ''}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Job Title</p>
          <p className="text-small w-70 greyText">{specificContract? specificContract[0].job_title: ''}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Job Description</p>
          <p className="text-small w-70 greyText">{specificContract? specificContract[0].job_description: ''}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Rate ($) </p>
          <p className="text-small w-70 greyText">{specificContract? specificContract[0].payment: ''}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Wallet Address </p>
          <p className="text-small w-70 greyText">{specificContract? specificContract[0].payment_address: ''}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Contract Address </p>
          <p className="text-small w-70 greyText">{specificContract? specificContract[0].contract_address: ''}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Status</p>
          <p className="text-small w-70 greyText">{specificContract? specificContract[0].status: ''}</p>
        </div>
        {!isEmployer && <div>
          {
            (acceptingPaymentClicked)?(
              <p>Processing acceptance...</p>
            ):(
              <div>
              {specificContract && specificContract[0].status === 'pending' && (<Button
                label="Accept Contract"
                onClick={() => {
                  handleAcceptance()
                }}
              />)}
              </div>
              
            )
          }
        </div>}
        
        
      </div>
    </Wrapper>
  );
};

export default ContractDetail;
