"use client"

import React, { useContext, useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'
import { ContractContext } from '@/app/create-contract/page'
import { capitalizeFirst, capitalizeFirstWord } from '@/plugins/utils'

const ContractDetails = () => {
    const { 
        handleNext, handlePrev, onChange, 
        state: { 
            contractType, employeeName, employeeEmail, 
            jobTitle, jobDescription, startDate, endDate,
            monthlyRate, milestoneTitles, milestoneRates, walletAddress 
        } 
    } = useContext(ContractContext)

    return (
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
                <Button label="Accept Contract" />
            </div>
        </div>
    )
}

export default ContractDetails



