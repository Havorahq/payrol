"use client"

import React, { useContext, useState } from 'react'
import styles from './auth.module.scss'
import Button from '../common/Button'
import Image from 'next/image'
import { OnboardingContext } from '@/app/onboarding/page'
import { FaEye, FaEyeSlash } from 'react-icons/fa'



const Signup = () => {
  const { onChange, onRouteChange, onReset, togglePassword, state: { firstName, lastName, email, businessName, businessEmail, password, isPasswordShown } } = useContext(OnboardingContext)
  const [activeTab, setActiveTab] = useState("employee")

  return (
    <div className={styles.container}>
        <div>
          <h1>Sign Up👋🏼</h1>
          <p className={styles.desc}>Create an account below</p>
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
                <p className={styles.tabDesc}>Sign Up As a Business</p>
              </div>
            </div>
            <div 
              className={`x-axis ${styles.tab} ${activeTab === 'employee' ? styles.tabActive : styles.tabInactive}`}
              onClick={() => { setActiveTab("employee"); onReset(); }}
            >
              <Image src='/icons/employee.png' alt="icon" width={36} height={36} />
              <div>
                <p className={styles.tabTitle}>Employee</p>
                <p className={styles.tabDesc}>Sign Up As an Employee</p>
              </div>
            </div>
          </div>
          <form>
            <div className="my-half">
              <label htmlFor="">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={firstName}
                placeholder="Enter your first name"
                onChange={onChange}
                required
              />
            </div>
            <div className="my-half">
              <label htmlFor="">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={lastName}
                placeholder="Enter your last name"
                onChange={onChange}
                required
              />
            </div>
            {
            activeTab === "employee" &&
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
            </div>}
            {
              activeTab === "business" ?
              <div>
                <div className="my-half">
                  <label htmlFor="">Business Name</label>
                  <input 
                    type="text" 
                    name="businessName"
                    value={businessName} 
                    placeholder="Enter business name"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="my-half">
                  <label htmlFor="">Business Email</label>
                  <input 
                    type="text" 
                    name="businessEmail"
                    value={businessEmail} 
                    placeholder="Enter business email"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              :
              null
            }
            <div className="my-half relative">
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
          </form>
        </div>

        <p className={styles.prompt}>
          Have an account? <span className={styles.action} onClick={() => onRouteChange("signin")}>Sign in</span>
        </p>
    </div>
  )
}

export default Signup