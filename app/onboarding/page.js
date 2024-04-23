"use client"

import React, { useState } from 'react'
import styles from './onboarding.module.scss'
import Image from 'next/image';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';


const Onboarding = () => {
  const [auth, setAuth] = useState("signin")

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className="x-axis gap-1">
          <Image src="/icons/xalariIcon.png" alt="Brand icon" width={50} height={50} />
          <h1>Xalari</h1>
        </div>
        <div>
          <p className={styles.title}>Payroll <br />Management on the <br />blockchain!</p>
          <p className={styles.desc}>
            Revolutionize Payroll Management with Blockchain Technology! Discover a secure, transparent, and efficient way to handle payroll, ensuring accuracy, trust, and simplicity for businesses of all sizes.
          </p>
        </div>
        <div className={styles.asset}>
          <Image src="/images/calculator.png" alt="Calculator image" width={400} height={350} />
        </div>
      </div>
      <div className={styles.right}>
        {
          auth === "signin" ?
          <Signin setAuth={setAuth} /> :
          <Signup setAuth={setAuth} />
        }
      </div>
    </div>
  )
}

export default Onboarding;