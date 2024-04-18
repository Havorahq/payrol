"use client"

import React, { useState } from 'react'
import styles from './auth.module.scss'
import Button from '../Button'
import Image from 'next/image'

const Signin = ({ setAuth }) => {
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
              onClick={() => setActiveTab("business")}
            >
              <Image src='/icons/dollar.png' alt="icon" width={36} height={36} />
              <div>
                <p className={styles.tabTitle}>Business</p>
                <p className={styles.tabDesc}>Sign In As a Business</p>
              </div>
            </div>
            <div 
              className={`x-axis ${styles.tab} ${activeTab === 'employee' ? styles.tabActive : styles.tabInactive}`}
              onClick={() => setActiveTab("employee")}
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
              <label htmlFor="">Email</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input type="text" />
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
          Need to create an account? <span className={styles.action} onClick={() => setAuth("signup")}>Sign up</span>
        </p>
    </div>
  )
}

export default Signin