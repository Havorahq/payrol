"use client"

import React, { useState } from 'react'
import styles from './auth.module.scss'
import Button from '../common/Button'
import Image from 'next/image'


const Signup = ({ setAuth }) => {
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
              onClick={() => setActiveTab("business")}
            >
              <Image src='/icons/dollar.png' alt="icon" width={36} height={36} />
              <div>
                <p className={styles.tabTitle}>Business</p>
                <p className={styles.tabDesc}>Sign Up As a Business</p>
              </div>
            </div>
            <div 
              className={`x-axis ${styles.tab} ${activeTab === 'employee' ? styles.tabActive : styles.tabInactive}`}
              onClick={() => setActiveTab("employee")}
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
              <label htmlFor="">First name</label>
              <input 
                type="text" 
                placeholder="Enter your first name"
              />
            </div>
            <div className="my-half">
              <label htmlFor="">Last name</label>
              <input 
                type="text" 
                placeholder="Enter your last name"
              />
            </div>
            {
              activeTab === "business" ?
              <div>
                <div className="my-half">
                  <label htmlFor="">Business name</label>
                  <input 
                    type="text" 
                    placeholder="Enter business name"
                  />
                </div>
                <div className="my-half">
                  <label htmlFor="">Business Email</label>
                  <input 
                    type="text" 
                    placeholder="Enter business email"
                  />
                </div>
              </div>
              :
              null
            }
            <div className="my-half">
              <label htmlFor="">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password"
              />
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
          Have an account? <span className={styles.action} onClick={() => setAuth("signin")}>Sign in</span>
        </p>
    </div>
  )
}

export default Signup