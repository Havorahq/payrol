"use client"

import React, { useContext, useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'
import { ContractContext } from '@/app/create-contract/page'

const Wallet = () => {
    const { handleNext, handlePrev, onChange, state: { walletAddress } } = useContext(ContractContext)

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
                        name="walletAddress"
                        value={walletAddress}
                        placeholder="Enter a Wallet Address"
                        onChange={onChange}
                        // required
                    />
                </div>
                <Button label="Connect Wallet" onClick={handleNext} />
            </form>
        </div>
    )
}

export default Wallet