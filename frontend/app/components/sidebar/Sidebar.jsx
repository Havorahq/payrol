"use client"

import React from 'react'
import Link from 'next/link';
import styles from './sidebar.module.scss'
import Image from 'next/image'
import { CiGrid42 } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { LiaSignOutAltSolid } from "react-icons/lia";

const Sidebar = (props) => {
    
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
            <Link href="/">Dashboard</Link>
          </div>
          <Link href="/profile">
            <div
              className={`${styles.link} ${
                props.title === "Profile"
                  ? styles.linkActive
                  : styles.linkInactive
              }`}
            >
              <IoMdSettings
                className={`${styles.icon} ${
                  props.title === "Profile"
                    ? styles.iconActive
                    : styles.iconInactive
                }`}
              />
              <p>Profile</p>
            </div>
          </Link>
          <div
            className={`${styles.link} ${styles.linkInactive} ${styles.signout}`}
          >
            <LiaSignOutAltSolid
              className={`${styles.icon} ${styles.iconInactive}`}
            />
            <Link href="/onboarding">Sign out</Link>
          </div>
        </div>
      </div>
    );
}

export default Sidebar