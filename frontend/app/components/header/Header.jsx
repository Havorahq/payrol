import React from 'react'
import styles from './header.module.scss'
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import Link from 'next/link';
import Image from 'next/image';

const Header = ({ toggleDrawer }) => {
    
    return (
        <div>
            <div className={styles.mobileHeader}>
                <Image src="/icons/xalari_logo_dh.png" alt="brand logo" width={104} height={31} />
                <RiMenu4Fill size={20} className="cursor" onClick={toggleDrawer} />
            </div>
            <div className={styles.headerContainer}>
                <Link href="/connect-button">Connect</Link>
                <div className={`${styles.iconContainer} ${styles.ashBg}`}>
                    <MdOutlineNotificationsNone size={20} />
                </div>
                <div className={styles.profileContainer}>
                    <div className={`${styles.iconContainer} ${styles.primaryBg}`}>
                        <p>JP</p>
                    </div>
                    <div className={styles.profileDetails}>
                        <h5>John Paul</h5>
                        <p>Business</p>
                    </div>
                    <FaCaretDown size={24} />
                </div>
            </div>
        </div>
    )
}

export default Header