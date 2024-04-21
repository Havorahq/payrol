"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../Button'

const RoleDetails = ({ handleNext, handlePrev }) => {

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
                <h1>Role Details</h1>
                <p className={styles.desc}>Enter the personal details of the employee below</p>
                <Image src="/images/step_3.png" alt='step' width={540} height={7} />
            </div>
            <form>
                <div className="my-half">
                    <label htmlFor="">Job Title</label>
                    <input 
                        type="text" 
                        placeholder="Enter Job Titles"
                    />
                </div>
                <div className="my-half">
                    <label htmlFor="">Job Description (Optional)</label>
                    <textarea 
                        type="text" 
                        placeholder="Enter Job description here"
                    />
                </div>
                <div className="my-half x-axis gap-1">
                    <div className="w-100">
                        <label htmlFor="">Start date</label>
                        <input 
                            type="text" 
                            placeholder="Start date"
                        />
                    </div>
                    <div className="w-100">
                        <label htmlFor="">End Date</label>
                        <input 
                            type="text" 
                            placeholder="End date"
                        />
                    </div>
                </div>
                <Button label="Continue" onClick={handleNext} />
            </form>
            {/* <Button label="Continue" style="btn-primary" /> */}
        </div>
    )
}

export default RoleDetails