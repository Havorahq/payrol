"use client"

import React, { useState } from 'react'
import styles from './contract.module.scss'
import Image from 'next/image';
import ContractType from '../components/contract/ContractType';
import Personal from '../components/contract/Personal';
import RoleDetails from '../components/contract/RoleDetails';
import Payments from '../components/contract/Payments';
// import Signin from '../components/auth/Signin';
// import Signup from '../components/auth/Signup';


const Contract = () => {
  const [step, setStep] = useState(4)

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
    }
  ]

  const renderStep = () => {
      switch (step) {
        case 0:
            return <ContractType />
            break;
        case 1:
            return <Personal />
            break;
        case 2:
            return <RoleDetails />
            break;
        case 3:
            return <Payments />
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
          <p className={styles.title}>{details[step].title}</p>
          <p className={styles.desc}>
            {details[step].description}
          </p>
        </div>
        <div className={styles.asset}>
          <Image src={`/images/${details[step].asset}`} alt="Calculator image" width={400} height={350} />
        </div>
      </div>
      <div className={styles.right}>
        {renderStep()}
      </div>
    </div>
  )
}

export default Contract;