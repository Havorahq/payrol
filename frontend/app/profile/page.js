"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

import styles from "./profile.module.scss";
import Wrapper from "@/app/components/wrapper/Wrapper";
import Modal from "@/app/components/common/modal/Modal";
import EditProfile from "@/app/components/auth/EditProfile";
import { findUser } from "../api/user";
import { useAccount, useDisconnect } from "wagmi";
import useUserData from "../hooks/useUserData";

const Profile = () => {
  const account = useAccount();
  const { address } = account;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { userData, isLoading, error } = useUserData();

  // console.log({ userData });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { email, first_name, last_name, public_address,user_type } = userData;

  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <EditProfile />
      </Modal>
      <Wrapper>
        <div className={styles.profileHeader}>
          <div className="x-axis gap-1">
            <div
              className={`${styles.iconContainer} ${styles.ashBg}`}
              onClick={() => router.push("/")}
            >
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
            <p className={styles.summaryValue}>
              {first_name} {last_name}
            </p>
          </div>
          <div>
            <p className={styles.summaryTitle}>Business Name</p>
            <p className={styles.summaryValue}>
              {first_name} {last_name}
            </p>
          </div>
          <div>
            <p className={styles.summaryTitle}>Business Name</p>
            <p className={styles.summaryValue}>{email}</p>
          </div>
          <div>
            <p className={styles.summaryTitle}>Email</p>
            <p className={styles.summaryValue}>{email}</p>
          </div>
          <div>
            <p className={styles.summaryTitle}>Account Type</p>
            <p className={styles.summaryValue}>{user_type}</p>
          </div>
          <div>
            <p className={styles.summaryTitle}>Public Address</p>
            <p className={styles.summaryValue}>{public_address}</p>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Profile;
