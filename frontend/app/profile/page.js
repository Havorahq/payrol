"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./profile.module.scss";
import Wrapper from "@/app/components/wrapper/Wrapper";
import Modal from "@/app/components/common/modal/Modal";
import EditProfile from "@/app/components/auth/EditProfile";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "../components/common/button/Button";
import useUserData from "../hooks/useUserData";
import Preloader from "../components/common/preloader/Preloader";

const Profile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { userData, isLoading, error } = useUserData();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Preloader height={80} />
      </div>
    );
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleUpdateOpen = () => {
    openModal();
  };

  const handleUpdateProfile = () => {};

  const { email, first_name, last_name, public_address, user_type } = userData;

  const employer = userData?.user_type == "business";
  const employee = userData?.user_type == "employee";

  return (
    <>
      <Wrapper>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="padded">
            <h1 className="text-big">Update Profile Details</h1>
            <div className="my-half">
              <p className="label">First Name</p>
              <input type="text" placeholder={first_name} />
            </div>
            <div className="my-half">
              <p className="label">Last Name</p>
              <input type="text" placeholder={last_name} />
            </div>
            <div className="my-half">
              <p className="label">Email Address</p>
              <input type="text" placeholder={email} disabled />
            </div>
            <Button
              label="Save Changes"
              onClick={() => handleUpdateProfile()}
              fit
            />
          </div>
        </Modal>
        <div className={styles.profileHeader}>
          <div className="x-axis gap-1">
            <div
              className={`${styles.iconContainer} ${styles.ashBg}`}
              onClick={() => router.push("/")}
            >
              <FaArrowLeft />
            </div>
            <div>
              <p className="w-100">Profile</p>
            </div>
          </div>

          <Button
            label="Update Profile"
            onClick={() => handleUpdateOpen()}
            fit
          />
        </div>
        <div className={styles.profileSummary}>
          {employee && (
            <div>
              <p className={styles.summaryTitle}>Name</p>
              <p className={styles.summaryValue}>
                {first_name} {last_name}
              </p>
            </div>
          )}
          {employer && (
            <div>
              <p className={styles.summaryTitle}>Business Name</p>
              <p className={styles.summaryValue}>
                {first_name} {last_name}
              </p>
            </div>
          )}
          {employer && (
            <div>
              <p className={styles.summaryTitle}>Business email</p>
              <p className={styles.summaryValue}>{email}</p>
            </div>
          )}
          {employee && (
            <div>
              <p className={styles.summaryTitle}>Email</p>
              <p className={styles.summaryValue}>{email}</p>
            </div>
          )}
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
