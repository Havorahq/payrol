"use client"

import React, { useState } from 'react'
import styles from './contract.module.scss'
import Image from 'next/image';
import ContractType from '../components/contract/ContractType';
import Personal from '../components/contract/Personal';
import RoleDetails from '../components/contract/RoleDetails';
import Payments from '../components/contract/Payments';
import Wallet from '../components/contract/Wallet';
import ContractDetails from '../components/contract/ContractDetails';
// import Signin from '../components/auth/Signin';
// import Signup from '../components/auth/Signup';


const Contract = () => {
  const [step, setStep] = useState(0)

  const handleNext = () => {
    if(step < 6) {
      setStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
      setStep(prev => prev - 1)
  }

  const details = [
    {
      title: "Create a contract",
      description: "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "signing-contract.png"
    },
    {
      title: "Personal Details",
      description: "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "personal.png"
    },
    {
      title: "Role Details",
      description: "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "office-desk.png"
    },
    {
      title: "Payment Schedule",
      description: "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "payment.png"
    },
    {
      title: "Wallet and Smart Contracts",
      description: "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "wallet.png"
    },
    {
      title: "Contract Details",
      description: "Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.",
      asset: "wallet.png"
    }
  ]

  const renderStep = () => {
      switch (step) {
        case 0:
            return <ContractType handleNext={handleNext} />
            break;
        case 1:
            return <Personal handleNext={handleNext} handlePrev={handlePrev} />
            break;
        case 2:
            return <RoleDetails handleNext={handleNext} handlePrev={handlePrev} />
            break;
        case 3:
            return <Payments handleNext={handleNext} handlePrev={handlePrev} />
            break;
        case 4:
            return <Wallet handleNext={handleNext} handlePrev={handlePrev} />
            break;
        case 5:
            return <ContractDetails handleNext={handleNext} handlePrev={handlePrev} />
            break;
        default:
            return <ContractType />
            break;
      }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className="x-axis gap-1">
          <Image src="/icons/xalariIcon.png" alt="Brand icon" width={50} height={50} />
          <h1>Xalari</h1>
        </div>
        <div>
          <p className={styles.title}>{details[step]?.title}</p>
          <p className={styles.desc}>
            {details[step]?.description}
          </p>
        </div>
        <div className={styles.asset}>
          <Image src={`/images/${details[step]?.asset}`} alt="Calculator image" width={350} height={300} />
        </div>
      </div>
      <div className={styles.right}>
        {renderStep()}
      </div>
    </div>
  )
}

export default Contract;