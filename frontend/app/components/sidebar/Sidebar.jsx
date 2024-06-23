"use client";

import React from "react";
import Link from "next/link";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import { CiGrid42 } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useDisconnect } from "wagmi";

const Sidebar = (props) => {
  const { disconnect } = useDisconnect();
  return (
    <div className={styles.sidebar}>
      <Image
        src="/icons/xalari_logo_dh.png"
        alt="brand logo"
        width={129}
        height={39}
      />
      <div className={styles.linkContainer}>
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
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div
          className={`${styles.link} ${
            props.title === "Profile" ? styles.linkActive : styles.linkInactive
          }`}
        >
          <IoMdSettings
            className={`${styles.icon} ${
              props.title === "Profile"
                ? styles.iconActive
                : styles.iconInactive
            }`}
          />
          <Link href="/profile">Profile</Link>
        </div>
        <div
          className={`${styles.link} ${
            props.title === "Payslip" ? styles.linkActive : styles.linkInactive
          }`}
        >
          <IoMdSettings
            className={`${styles.icon} ${
              props.title === "Payslip"
                ? styles.iconActive
                : styles.iconInactive
            }`}
          />
          <Link href="/payslip"> Payslip</Link>
        </div>
        <div
          className={`${styles.link} ${styles.linkInactive} ${styles.signout}`}
        >
          <LiaSignOutAltSolid
            className={`${styles.icon} ${styles.iconInactive}`}
          />
          <div>
            <a style={{ cursor: "pointer" }} onClick={disconnect}>
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
