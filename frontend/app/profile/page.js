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
import Button from "../components/common/Button";
import useUserData from "../hooks/useUserData";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { userData, isLoading, error } = useUserData();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return (
      <div style={{ width: "100px", margin: "auto", display: "block" }}>
        <ClipLoader color="#52bf" size={100} />
      </div>
    );
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { email, first_name, last_name, public_address, user_type } = userData;

  const employer = userData?.user_type == "business";
  const employee = userData?.user_type == "employee";

  return (
    <>
      <Wrapper>
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
        <Link href="/payslip">
          {" "}
          <Button label="Generate Payslip" />
        </Link>
      </Wrapper>
    </>
  );
};

export default Profile;
