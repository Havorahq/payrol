"use client"

import React, { useState } from 'react'
import styles from './contract.module.scss'
import Image from 'next/image';
import ContractType from '../components/contract/ContractType';
import Personal from '../components/contract/Personal';
import RoleDetails from '../components/contract/RoleDetails';
// import Signin from '../components/auth/Signin';
// import Signup from '../components/auth/Signup';


const Contract = () => {
  const [step, setStep] = useState(3)

  const renderStep = () => {
      switch (step) {
        case 1:
            return <ContractType />
            break;
        case 2:
            return <Personal />
            break;
        case 3:
            return <RoleDetails />
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
          <p className={styles.title}>Create a contract</p>
          <p className={styles.desc}>
          Seamlessly Create Contracts on the Blockchain! Simplify and streamline your agreement processes with our intuitive platform.
          </p>
        </div>
        <div className={styles.asset}>
          <Image src="/images/signing-contract.png" alt="Calculator image" width={400} height={350} />
        </div>
      </div>
      <div className={styles.right}>
        {renderStep()}
      </div>
    </div>
  )
}

export default Contract;