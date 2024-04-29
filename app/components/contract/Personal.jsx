"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'

const Personal = ({ handleNext, handlePrev }) => {

    return (
        <div className={styles.section}>
            <Image 
                src="/icons/previous.png" 
                alt="Learn More" 
                className="cursor"
                width={71} 
                height={18}
                onClick={handlePrev}
            />
            <div>
                <h1>Personal Details</h1>
                <p className={styles.desc}>Enter the personal details of the employee below</p>
                {/* <Image src="/images/step_2.png" alt='step' width={450} height={7} /> */}
            </div>
            <form>
                <div className="my-1">
                    <label htmlFor="">Employee Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Employee Name"
                    />
                </div>
                <div className="my-1">
                    <label htmlFor="">Employee Email</label>
                    <input 
                        type="text" 
                        placeholder="Enter Employee Email"
                    />
                </div>
                <Button label="Continue" onClick={handleNext} />
            </form>
            {/* <Button label="Continue" style="btn-primary" /> */}
        </div>
    )
}

export default Personal