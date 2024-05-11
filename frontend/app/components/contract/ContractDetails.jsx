"use client"

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'
import { ContractContext } from '@/app/create-contract/page'
import { capitalizeFirst, writeContract } from '@/plugins/utils'
import { useRouter } from 'next/navigation'
import Modal from '../common/modal/Modal'
import { useContractEvent, useAccount, useContractWrite } from "wagmi";
import { factoryAddress } from '@/lib/contractFactory'
import factoryAbi from '@/lib/factoryAbi.json'

const ContractDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    useContractEvent({
        address: factoryAddress,
        abi: factoryAbi,
        eventName: "FixedRateAgreementDeployed",
        listener: (eventNumber) => {
            console.log(eventNumber[0])
        },
      });

    const { data: fixedContractHash, error:fixedContractError, 
        isLoading: fixContractLoading, write: deployFixedAgreement, isSuccess:fixedContractSuccess} = useContractWrite({
        address: factoryAddress,
        abi: factoryAbi,
        functionName: 'createNewFixedRateAgreement',
    })

    // PAYG = PAY AS YOU GO
    const { data: paygContractHash, error:paygContractError, 
        isLoading: paygContractLoading, write: deployPAYGAgreement, isSuccess:paygContractSuccess} = useContractWrite({
        address: factoryAddress,
        abi: factoryAbi,
        functionName: 'createNewPayAsYouGoAgreement',
    })

    useEffect(()=>{
        if (fixedContractSuccess) {
            console.log('fixed rate contract deployed', fixedContractSuccess)
        }

        if (paygContractSuccess){
            console.log('PAYG contract deployed')
        }

        if (fixedContractError){
            console.log(fixedContractError, 'error deploying fixed contract')
        }

        if (paygContractError){
            console.log(paygContractError, 'error deploying payg contract')
        }
        
    }, [fixedContractSuccess, paygContractSuccess, fixedContractError, paygContractError])

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
        if (state.contractType === 'fixed'){
            deployFixedAgreement({
                args: [
                    'employer@employer.com',
                    'employee@employee.com',
                    '0xE08686958FF334A5422df17FaF05dd989e779FfA',
                    '0x2728DD8B45B788e26d12B13Db5A244e5403e7eda',
                    state.monthlyRate
                ]
            })
        } else if (state.contractType.toLowerCase() === 'pay as you go'){
            deployPAYGAgreement({
                args: [
                    'employer@employer.com',
                    'employee@employee.com',
                    '0xE08686958FF334A5422df17FaF05dd989e779FfA',
                    '0x2728DD8B45B788e26d12B13Db5A244e5403e7eda',
                    state.monthlyRate
                ]
            })
        }
        
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



