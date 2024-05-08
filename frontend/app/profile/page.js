"use client"

import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

import styles from "./profile.module.scss"
import Wrapper from "@/app/components/wrapper/Wrapper"
import Modal from '@/app/components/common/modal/Modal'
import EditProfile from '@/app/components/auth/EditProfile'

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <EditProfile />
      </Modal>
      <Wrapper>
        <div className={styles.profileHeader}>
          <div className="x-axis gap-1">
            <div className={`${styles.iconContainer} ${styles.ashBg}`} onClick={() => router.push('/')}>
              <FaArrowLeft />
            </div>
            <p className="w-100">Profile</p>
          </div>
          <div className={`${styles.editButton}`} onClick={openModal}>
              Edit Profile        
          </div>
        </div>
        <div className={styles.profileSummary}>
          <div>
            <p className={styles.summaryTitle}>Name</p>
            <p className={styles.summaryValue}>John Paul</p>
          </div>
          <div>
            <p className={styles.summaryTitle}>Business Name</p>
            <p className={styles.summaryValue}>John Paul</p>
          </div>
          <div>
            <p className={styles.summaryTitle}>Business Name</p>
            <p className={styles.summaryValue}>John Paul</p>
          </div>
          <div>
            <p className={styles.summaryTitle}>Email</p>
            <p className={styles.summaryValue}>johnpaul@gmail.com</p>
          </div>
          <div>
            <p className={styles.summaryTitle}>Account Type</p>
            <p className={styles.summaryValue}>Business</p>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default Profile