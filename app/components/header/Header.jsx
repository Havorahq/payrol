import React from 'react'
import styles from './header.module.scss'
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

const Header = () => {
    return (
        <div className={styles.headerContainer}>
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
                <FaCaretDown size={20} />
            </div>
        </div>
    )
}

export default Header