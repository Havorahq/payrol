"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'

const Wallet = ({ handlePrev, handleNext }) => {


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
                <h1>Wallet and Smart Contracts</h1>
                <p className={styles.desc}>Connect wallet below</p>
                {/* <Image src="/images/step_5.png" alt='step' width={450} height={7} /> */}
            </div>
            <form>
                <div className="my-half">
                    <label htmlFor="">Employee wallet address</label>
                    <input 
                        type="text" 
                        placeholder="Enter a Wallet Address"
                    />
                </div>
                <Button label="Connect Wallet" onClick={handleNext} />
            </form>
        </div>
    )
}

export default Wallet