"use client";

import React from "react";
import Link from "next/link";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import { CiGrid42 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoReceiptOutline } from "react-icons/io5";
import { useDisconnect } from "wagmi";
import Swal from "sweetalert2";

const Sidebar = (props) => {
  const { disconnect } = useDisconnect();

  const handleSignout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to sign out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        disconnect();
      }
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={`x-axis`}>
        <Image
          src="/icons/secondaryLogo.png"
          alt="Brand icon"
          width={110}
          height={28}
        />
      </div>
      <div className={styles.linkContainer}>
        <Link href="/dashboard">
          <div
            className={`${styles.link} ${
              props.title === "Dashboard"
                ? styles.linkActive
                : styles.linkInactive
            }`}
          >
            <CiGrid42
              className={`${styles.icon} ${
                props.title === "Dashboard"
                  ? styles.iconActive
                  : styles.iconInactive
              }`}
            />
            Dashboard
          </div>
        </Link>
        <Link href="/profile">
          <div
            className={`${styles.link} ${
              props.title === "Profile"
                ? styles.linkActive
                : styles.linkInactive
            }`}
          >
            <CgProfile
              className={`${styles.icon} ${
                props.title === "Profile"
                  ? styles.iconActive
                  : styles.iconInactive
              }`}
            />
            Profile
          </div>
        </Link>
        <Link href="/payslip">
          <div
            className={`${styles.link} ${
              props.title === "Payslip"
                ? styles.linkActive
                : styles.linkInactive
            }`}
          >
            <IoReceiptOutline
              className={`${styles.icon} ${
                props.title === "Payslip"
                  ? styles.iconActive
                  : styles.iconInactive
              }`}
            />
            Payslip
          </div>
        </Link>
        <div
          onClick={handleSignout}
          className={`${styles.link} ${styles.linkInactive} ${styles.signout}`}
        >
          <LiaSignOutAltSolid
            className={`${styles.icon} ${styles.iconInactive}`}
          />
          <div>
            <a style={{ cursor: "pointer" }}>Sign out</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
