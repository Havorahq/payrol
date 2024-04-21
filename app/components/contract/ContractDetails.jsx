"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../Button'

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
            </div>
        </div>
    )
}

export default ContractDetails