"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'

const ContractDetails = ({ handlePrev}) => {
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
                <h1>Contract Details📄</h1>
                <p className={styles.desc}>Details of your contract below</p>
                {/* <Image src="/images/step_5.png" alt='step' width={540} height={7} /> */}
                <div className={`${styles.hr} py-1 mt-1`}>
                    <p className="label">Pay As You Go</p>
                    <p className="text-small w-70 greyText">For contracts that require time sheet or work submissions each payment cycle.</p>
                </div>
                <div className={`${styles.hr} py-1`}>
                    <p className="label">Employee Name</p>
                    <p className="text-small w-70 greyText">John Bola</p>
                </div>
                <div className={`${styles.hr} py-1`}>
                    <p className="label">Employee Email</p>
                    <p className="text-small w-70 greyText">test@gmail.com</p>
                </div>
                <div className={`${styles.hr} py-1`}>
                    <p className="label">Job Title</p>
                    <p className="text-small w-70 greyText">Developer</p>
                </div>
                <div className={`${styles.hr} py-1`}>
                    <p className="label">Job Description</p>
                    <p className="text-small w-70 greyText">This a a demo description</p>
                </div>
                <div className={`${styles.hr} py-1`}>
                    <p className="label">Start date</p>
                    <p className="text-small w-70 greyText">Wednesday, 31 Jan 2024</p>
                </div>
                <div className={`${styles.hr} py-1`}>
                    <p className="label">End date</p>
                    <p className="text-small w-70 greyText">Thursday, 1 Feb 2024</p>
                </div>
                <div className={`${styles.hr} py-1`}>
                    <p className="label">Monthly Rate </p>
                    <p className="text-small w-70 greyText">This a a demo description</p>
                </div>
                <Button label="Accept Contract" />
            </div>
        </div>
    )
}

export default ContractDetails