"use client"

import React, { useState } from 'react'
import styles from "./auth.module.scss"
import Button from '../common/Button'

const EditProfile = () => {
    return (
        <div className={styles.container}>
        <div>
          <h1>Edit Profile</h1>
        </div>

        <div>
          <form>
            <div className="my-half">
              <label htmlFor="">First name</label>
              <input 
                type="text" 
                placeholder="John"
              />
            </div>
            <div className="my-half">
              <label htmlFor="">Last name</label>
              <input 
                type="text" 
                placeholder="Paul"
              />
            </div>
            {/* {
              activeTab === "business" ? */}
              <div>
                <div className="my-half">
                  <label htmlFor="">Business name</label>
                  <input 
                    type="text" 
                    placeholder="Boxlo"
                  />
                </div>
                <div className="my-half">
                  <label htmlFor="">Business Email</label>
                  <input 
                    type="text" 
                    placeholder="Johnpaul@gmail.com"
                  />
                </div>
              </div>
              {/* :
              null
            } */}
            <div className="my-half">
              <label htmlFor="">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password"
              />
            </div>
            <div className="my-half">
              <label htmlFor="">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Enter your password"
              />
            </div>
            <Button label="Save Changes" />
          </form>
        </div>

        {/* <p className={styles.prompt}>
          Have an account? <span className={styles.action} onClick={() => setAuth("signin")}>Sign in</span>
        </p> */}
    </div>
    )
}

export default EditProfile