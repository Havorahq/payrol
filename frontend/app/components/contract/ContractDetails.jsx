"use client"

import React, { useContext, useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'
import { ContractContext } from '@/app/create-contract/page'
import { capitalizeFirst, capitalizeFirstWord } from '@/plugins/utils'
import { useRouter } from 'next/navigation'
import Modal from '../common/modal/Modal'
import { ContractHandler } from '@/app/smart-contract/handler'
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall, getContract } from "thirdweb";
import { client } from '@/lib/client'
import { defineChain, toWei } from "thirdweb";

const liskId = 	4202;

const contractFactory = getContract({
    client,
    chain: defineChain(liskId),
    address: "0xA18F9BDEb5990fbfB6FE6CE43c97699602eA7747",
  });

const ContractDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const { mutate: sendTransaction, isPending } = useSendTransaction();

    const { 
        handleNext, handlePrev, onChange, state,
        state: { 
            contractType, employeeName, employeeEmail, 
            jobTitle, jobDescription, startDate, endDate,
            monthlyRate, milestoneTitles, milestoneRates, walletAddress 
        } 
    } = useContext(ContractContext)

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = () => {
        console.log("Submitted: ", state)
        const deployTx = prepareContractCall({
            contractFactory,
            method: "function createNewFixedRateAgreement(string memory _employerId,string memory _employeeId,address _employerAddress,address _currency,uint256 _fixedPayment)",
            params: [
                    "employerId",
                    "employeeId",
                    "0xA18F9BDEb5990fbfB6FE6CE43c97699602eA7747",
                    "0x2728DD8B45B788e26d12B13Db5A244e5403e7eda",
                    toWei(state.monthlyRate)
            ],
            value: 0
        })
        console.log(deployTx, 'tttt')
        sendTransaction(deployTx);
        console.log(isPending,'the pending')
    }

    return (
        <>
            <Modal  isOpen={isOpen} onClose={closeModal}>
                <div className='padded'>
                    <h2>All done!🎉</h2>
                    <p>You’ve successfully signed your contract! </p>
                    <Button label="Back to Home" onClick={() => router.push('/')} />
                </div>
            </Modal>
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
                    <h1>Contract Details📄</h1>
                    <p className={styles.desc}>Details of your contract below</p>
                    {/* <Image src="/images/step_5.png" alt='step' width={540} height={7} /> */}
                    <div className={`${styles.hr} py-1 mt-1`}>
                        <p className="label">Contract Type</p>
                        <p className="text-small w-70 greyText">{capitalizeFirst(contractType)}</p>
                    </div>
                    <div className={`${styles.hr} py-1`}>
                        <p className="label">Employee Name</p>
                        <p className="text-small w-70 greyText">{capitalizeFirst(employeeName)}</p>
                    </div>
                    <div className={`${styles.hr} py-1`}>
                        <p className="label">Employee Email</p>
                        <p className="text-small w-70 greyText">{employeeEmail}</p>
                    </div>
                    <div className={`${styles.hr} py-1`}>
                        <p className="label">Job Title</p>
                        <p className="text-small w-70 greyText">{jobTitle}</p>
                    </div>
                    <div className={`${styles.hr} py-1`}>
                        <p className="label">Job Description</p>
                        <p className="text-small w-70 greyText">{jobDescription}</p>
                    </div>
                    <div className={`${styles.hr} py-1`}>
                        <p className="label">Start date</p>
                        <p className="text-small w-70 greyText">{startDate}</p>
                    </div>
                    <div className={`${styles.hr} py-1`}>
                        <p className="label">End date</p>
                        <p className="text-small w-70 greyText">{endDate}</p>
                    </div>
                    <div className={`${styles.hr} py-1`}>
                        <p className="label">Monthly Rate </p>
                        <p className="text-small w-70 greyText">{monthlyRate}</p>
                    </div>
                    <div className={`${styles.hr} py-1`}>
                        <p className="label">Wallet Address </p>
                        <p className="text-small w-70 greyText">{walletAddress}</p>
                    </div>
                    <Button label="Accept Contract" onClick={() => {
                        // openModal(); 
                        handleSubmit()
                        }} />
                </div>
            </div>
        </>
    )
}

export default ContractDetails



