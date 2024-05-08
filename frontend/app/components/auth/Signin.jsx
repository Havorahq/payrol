"use client"

import React, { useState, useContext } from 'react'
import styles from './auth.module.scss'
import Button from '../common/Button'
import Image from 'next/image'
import { OnboardingContext } from '@/app/onboarding/page'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Signin = () => {
  const { onChange, onRouteChange, onReset, togglePassword, state: { email, password, isPasswordShown } } = useContext(OnboardingContext)
  const [activeTab, setActiveTab] = useState("employee")

  return (
    <div className={styles.container}>
        <div>
          <h1>Welcome Back👋🏼</h1>
          <p className={styles.desc}>Please signin to your account</p>
        </div>

        <div>
          <div className="x-axis gap-1 my-1">
            <div 
              className={`x-axis ${styles.tab} ${activeTab === 'business' ? styles.tabActive : styles.tabInactive}`}
              onClick={() => { setActiveTab("business"); onReset(); }}
            >
              <Image src='/icons/dollar.png' alt="icon" width={36} height={36} />
              <div>
                <p className={styles.tabTitle}>Business</p>
                <p className={styles.tabDesc}>Sign In As a Business</p>
              </div>
              {/* <Image src='/icons/check.png' className={styles.check} alt="icon" width={15} height={15} /> */}
            </div>
            <div 
              className={`x-axis ${styles.tab} ${activeTab === 'employee' ? styles.tabActive : styles.tabInactive}`}
              onClick={() => { setActiveTab("employee"); onReset(); }}
            >
              <Image src='/icons/employee.png' alt="icon" width={36} height={36} />
              <div>
                <p className={styles.tabTitle}>Employee</p>
                <p className={styles.tabDesc}>Sign In As an Employee</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label>Email</label>
              <input 
                type="text" 
                name="email"
                value={email}
                placeholder="Enter Email Address"
                onChange={onChange}
                required
              />
            </div>
            <div className='relative'>
              <label htmlFor="">Password</label>
              <input 
                type={isPasswordShown ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Enter Password"
                onChange={onChange}
                required
              />
              {
                isPasswordShown?
                <FaEyeSlash size={22} className="password-icon" color="#A2A6AD" onClick={togglePassword}  />
                :  
                <FaEye className="password-icon" color="#A2A6AD" size={22} onClick={togglePassword}  />  
              }
            </div>
            <Button label="Continue" />
            <div className="x-axis gap-1">
              <div className="line" />
              <p className="greyText">OR</p>
              <div className="line" />
            </div>
            <Button label="Continue with google" style="btn-secondary" />
          </div>
        </div>

        <p className={styles.prompt}>
          Need to create an account? <span className={styles.action} onClick={() => onRouteChange("signup")}>Sign up</span>
        </p>
    </div>
  )
}

export default Signin