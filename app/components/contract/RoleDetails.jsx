"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './contractType.module.scss'
import Button from '../common/Button'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const RoleDetails = ({ handleNext, handlePrev }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const onFromDateChange = date => {
        const value = moment(new Date(date)).format('YYYY-MM-DD')

        if (value !== "1970-01-01") {
            setStartDate(value)
        } else {
            setStartDate("")
        }
    }

    const onToDateChange = date => {
        const value = moment(new Date(date)).format('YYYY-MM-DD')

        if (value !== "1970-01-01") {
            setEndDate(value)
        } else {
            setEndDate("")
        }
    }


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
                <Image src="/images/step_3.png" alt='step' width={450} height={7} />
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
                        <DatePicker 
                            onChange={date => onFromDateChange(date)}
                            className="formcontrol w-100"
                            dateFormat="dd-MM-yyyy"
                            placeholderText="dd-mm-yy"
                            minDate={endDate || new Date()}
                            isClearable={startDate}
                            wrapperClassName="datePicker"
                            name="startDate"
                            selectsStart
                            selected={startDate}
                        />
                    </div>
                    <div className="w-100">
                        <label htmlFor="">End Date</label>
                        <DatePicker 
                            dateFormat="dd-MM-yyyy"
                            onChange={date => onToDateChange(date)}
                            selected={endDate}
                            minDate={startDate}
                            isClearable={endDate}
                            className="formcontrol"
                            wrapperClassName="datePicker"
                            name="endDate"
                            selectsEnd
                            placeholderText="dd-mm-yy"
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