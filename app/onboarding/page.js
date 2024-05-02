"use client"

import React, { useState, createContext } from 'react'
import styles from './onboarding.module.scss'
import Image from 'next/image';
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';

export const OnboardingContext = createContext();

const Onboarding = () => {
  const [state, setState] = useState({
    route: "signin",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    businessName: "",
    businessEmail: "",
    isPasswordShown: false
  })

  const { route, firstName, lastName, businessName, businessEmail, email, password, isPasswordShown } = state;

  const renderPages = () => {
    switch (route) {
      case "signin":
        return <Signin />;
        break;
      case "signup":
        return <Signup />;
        break;
      default:
        return <Signin />;
        break;
    }
  }

  const onRouteChange = (value) =>{
    setState(state=>({
        ...state,
        route: value
    }))
  }

  const togglePassword = () => {
    setState(state => ({
      ...state,
      isPasswordShown : !isPasswordShown,
    }))
  }

  const onChange = (e) => {
    setState(state=>({
        ...state,
       [ e.target.name]: e.target.value
    }))
  }

  return (
    <OnboardingContext.Provider 
      value={{ 
        onChange,
        togglePassword,
        onRouteChange,
        state
      }}
    >
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
          {renderPages()}
        </div>
      </div>
    </OnboardingContext.Provider>
  )
}

export default Onboarding;