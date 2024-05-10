"use client"

import React, { useContext, useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'
import { ContractContext } from '../../create-contract/page'

const Personal = () => {
    const { handleNext, handlePrev, onChange, state: { employeeName, employeeEmail } } = useContext(ContractContext)

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
                        name="employeeName"
                        value={employeeName}
                        placeholder="Enter Employee Name"
                        onChange={onChange}
                        // required
                    />
                </div>
                <div className="my-1">
                    <label htmlFor="">Employee Email</label>
                    <input 
                        type="text" 
                        name="employeeEmail"
                        value={employeeEmail}
                        placeholder="Enter Employee Email"
                        onChange={onChange}
                        // required
                    />
                </div>
                <Button label="Continue" onClick={handleNext} />
            </form>
        </div>
    )
}

export default Personal