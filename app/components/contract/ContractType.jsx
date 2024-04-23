"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../Button'
import { FaChevronRight } from 'react-icons/fa'

const ContractType = ({ handleNext }) => {
    const [activeTab, setActiveTab] = useState("")

    return (
        <div className={styles.container}>
            <div>
                <h1>Create Contract📄</h1>
                <p className={styles.desc}>Create an account below</p>
                <div className="w-100">
                    <Image src="/images/step_1.png" alt='step' width={450} height={7} />
                </div>
            </div>
            <div className="y-axis">
                <div 
                    className={`x-axis justify-between ${styles.tab} ${activeTab === 'fixed' ? styles.tabActive : styles.tabInactive}`}
                    onClick={() => setActiveTab("fixed")}
                >
                    <div className="x-axis gap-1">
                        <Image src='/icons/fixed.png' alt="icon" width={36} height={36} />
                        <div className={styles.tabDetails}>
                            <p className={styles.tabTitle}>Fixed Rate</p>
                            <p className={styles.tabDesc}>For contracts that have a fixed rate each payment cycle</p>
                            <Image src="/icons/learnmore.png" alt="Learn More" width={71} height={18} />
                        </div>
                    </div>
                    <FaChevronRight size={14} color={activeTab === 'fixed' ? "#14125e" : "#1C1B1F"} />
                </div>
                <div 
                    className={`x-axis justify-between ${styles.tab} ${activeTab === 'payAsYouGo' ? styles.tabActive : styles.tabInactive}`}
                    onClick={() => setActiveTab("payAsYouGo")}
                >
                    <div className="x-axis gap-1">
                        <Image src='/icons/payAsYouGo.png' alt="icon" width={36} height={36} />
                        <div>
                            <p className={styles.tabTitle}>Pay As You Go</p>
                            <p className={styles.tabDesc}>For contracts that require time sheet or work submissions each payment cycle.</p>
                            <Image src="/icons/learnmore.png" alt="Learn More" width={71} height={18} />
                            {/* <span className="x-axis my-half">
                                <p className="text-small">Learn more</p>
                            </span> */}
                        </div>
                    </div>
                    <FaChevronRight size={14} color={activeTab === 'payAsYouGo' ? "#14125e" : "#1C1B1F"} />
                </div>
                <div 
                    className={`x-axis justify-between ${styles.tab} ${activeTab === 'milestone' ? styles.tabActive : styles.tabInactive}`}
                    onClick={() => setActiveTab("milestone")}
                >
                    <div className="x-axis gap-1">
                        <Image src='/icons/milestone.png' alt="icon" width={36} height={36} />
                        <div>
                            <p className={styles.tabTitle}>Milestone</p>
                            <p className={styles.tabDesc}>For contracts with milestones that get paid each time they’re completed.</p>
                            <Image src="/icons/learnmore.png" alt="Learn More" width={71} height={18} />
                        </div>
                    </div>
                    <FaChevronRight size={14} color={activeTab === 'milestone' ? "#14125e" : "#1C1B1F"} />
                </div>
            </div>
            <Button label="Continue"  onClick={handleNext} style="btn-primary" />
        </div>
    )
}

export default ContractType