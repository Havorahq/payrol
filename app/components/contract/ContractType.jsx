"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../Button'

const ContractType = () => {
    const [activeTab, setActiveTab] = useState("")

    return (
        <div className={styles.container}>
            <div>
                <h1>Create Contract📄</h1>
                <p className={styles.desc}>Create an account below</p>
            </div>
            <div className="y-axis">
                <div 
                    className={`x-axis ${styles.tab} ${activeTab === 'fixed' ? styles.tabActive : styles.tabInactive}`}
                    onClick={() => setActiveTab("fixed")}
                >
                    <Image src='/icons/fixed.png' alt="icon" width={36} height={36} />
                    <div className={styles.tabDetails}>
                        <p className={styles.tabTitle}>Fixed Rate</p>
                        <p className={styles.tabDesc}>For contracts that have a fixed rate each payment cycle</p>
                    </div>
                </div>
                <div 
                    className={`x-axis ${styles.tab} ${activeTab === 'payAsYouGo' ? styles.tabActive : styles.tabInactive}`}
                    onClick={() => setActiveTab("payAsYouGo")}
                >
                    <Image src='/icons/payAsYouGo.png' alt="icon" width={36} height={36} />
                    <div>
                        <p className={styles.tabTitle}>Pay As You Go</p>
                        <p className={styles.tabDesc}>For contracts that require time sheet or work submissions each payment cycle.</p>
                    </div>
                </div>
                <div 
                    className={`x-axis ${styles.tab} ${activeTab === 'milestone' ? styles.tabActive : styles.tabInactive}`}
                    onClick={() => setActiveTab("milestone")}
                >
                    <Image src='/icons/milestone.png' alt="icon" width={36} height={36} />
                    <div>
                        <p className={styles.tabTitle}>Milestone</p>
                        <p className={styles.tabDesc}>For contracts with milestones that get paid each time they’re completed.</p>
                    </div>
                </div>
            </div>
            <Button label="Continue" style="btn-primary" />
        </div>
    )
}

export default ContractType