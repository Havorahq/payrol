"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../Button'
import { FaChevronLeft, FaChevronUp } from 'react-icons/fa'

const Payments = () => {
    // const [activeTab, setActiveTab] = useState("")

    return (
        <div className={styles.section}>
            <div>
                <h1>Payments Schedule</h1>
                <p className={styles.desc}>Enter the personal details of the employee below</p>
                <Image src="/images/step_3.png" alt='step' width={540} height={7} />
            </div>
            <form>
                <div className="my-half">
                    <label htmlFor="">Monthly Rate</label>
                    <div className='inputContainer x-axis'>
                        <select name="" id="">
                            <option value="">
                                USDT
                            </option>
                            <option value="">BTC</option>
                        </select>
                        <input 
                            type='text'
                            placeholder='1000'
                        />
                    </div>
                </div>
                <div className="x-axis my-1 dialog justify-between">
                    <p className='label'>Milestones</p>
                    <div>
                        <FaChevronUp />
                    </div>
                </div>
                <div>
                    {/* <div className='x-axis justify-between'>
                        <p className='w-100'>Add Milestone Below</p>
                        <Button label={"+"} />
                    </div> */}
                    <div className="my-half x-axis gap-1">
                        <div className="w-100">
                            <label htmlFor="">Title</label>
                            <input 
                                type="text" 
                                placeholder="Start date"
                            />
                        </div>
                        <div className="w-100">
                            <label htmlFor="">Enter Rate</label>
                            <div className='inputContainer x-axis w-100'>
                                <select name="" id="">
                                    <option value="">
                                        USDT
                                    </option>
                                    <option value="">BTC</option>
                                </select>
                                <input 
                                    type='text'
                                    placeholder='1000'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-half x-axis gap-1">
                        <div className="w-100">
                            <label htmlFor="">Title</label>
                            <input 
                                type="text" 
                                placeholder="Start date"
                            />
                        </div>
                        <div className="w-100">
                            <label htmlFor="">Enter Rate</label>
                            <input 
                                type="text" 
                                placeholder="End date"
                            />
                        </div>
                    </div>
                </div>
                <Button label="Continue" />
            </form>
            {/* <Button label="Continue" style="btn-primary" /> */}
        </div>
    )
}

export default Payments