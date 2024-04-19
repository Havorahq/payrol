"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../Button'

const Personal = () => {
    const [activeTab, setActiveTab] = useState("")

    return (
        <div className={styles.section}>
            <div>
                <h1>Personal Details</h1>
                <p className={styles.desc}>Enter the personal details of the employee below</p>
                <Image src="/images/step_2.png" alt='step' width={540} height={7} />
            </div>
            <form>
                <div className="my-half">
                    <label htmlFor="">Employee Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Employee Name"
                    />
                </div>
                <div className="my-half">
                    <label htmlFor="">Employee Email</label>
                    <input 
                        type="text" 
                        placeholder="Enter Employee Email"
                    />
                </div>
                <Button label="Continue" />
            </form>
            {/* <Button label="Continue" style="btn-primary" /> */}
        </div>
    )
}

export default Personal