"use client"

import React, { useContext, useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'
import DatePicker from 'react-datepicker'
import { FaArrowDown } from 'react-icons/fa'
import { FaCaretDown } from "react-icons/fa";
import { ContractContext } from '../../create-contract/page'

const RoleDetails = () => {
    const { handleNext, handlePrev, onChange, onFromDateChange, onToDateChange, state: { jobTitle, jobDescription, startDate, endDate } } = useContext(ContractContext)

    // const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");

    // const onFromDateChange = date => {
    //     const value = moment(new Date(date)).format('YYYY-MM-DD')

    //     if (value !== "1970-01-01") {
    //         setStartDate(value)
    //     } else {
    //         setStartDate("")
    //     }
    // }

    // const onToDateChange = date => {
    //     const value = moment(new Date(date)).format('YYYY-MM-DD')

    //     if (value !== "1970-01-01") {
    //         setEndDate(value)
    //     } else {
    //         setEndDate("")
    //     }
    // }


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
                {/* <Image src="/images/step_3.png" alt='step' width={450} height={7} /> */}
            </div>
            <form>
                <div className="my-1">
                    <label htmlFor="">Job Title</label>
                    <input 
                        type="text" 
                        name="jobTitle"
                        value={jobTitle}
                        placeholder="Enter Job Titles"
                        onChange={onChange}
                    />
                </div>
                <div className="my-1">
                    <label htmlFor="">Job Description (Optional)</label>
                    <textarea 
                        type="text" 
                        name="jobDescription"
                        value={jobDescription}
                        placeholder="Enter Job description here"
                        onChange={onChange}
                    />
                </div>
                <div className="my-half x-axis gap-1">
                    <div className="w-100">
                        <label htmlFor="">Start date</label>
                        <div className={styles.datePickerContainer}>
                            <DatePicker 
                                dateFormat="dd-MM-yyyy"
                                onChange={date => onFromDateChange(date)}
                                className={styles.datePicker}
                                placeholderText="dd-mm-yy"
                                minDate={endDate || new Date()}
                                isClearable={false}
                                wrapperClassName="datePicker"
                                name="startDate"
                                selectsStart
                                selected={startDate}
                            />
                            <FaCaretDown className={styles.icon} />
                        </div>
                    </div>
                    <div className="w-100">
                        <label htmlFor="">End Date</label>
                        <div className={styles.datePickerContainer}>
                            <DatePicker 
                                dateFormat="dd-MM-yyyy"
                                onChange={date => onToDateChange(date)}
                                selected={endDate}
                                minDate={startDate}
                                isClearable={false}
                                className={styles.datePicker}
                                wrapperClassName="datePicker"
                                name="endDate"
                                selectsEnd
                                placeholderText="dd-mm-yy"
                            />
                            <FaCaretDown className={styles.icon} />
                        </div>
                    </div>
                </div>
                <Button label="Continue" onClick={handleNext} />
            </form>
            {/* <Button label="Continue" style="btn-primary" /> */}
        </div>
    )
}

export default RoleDetails