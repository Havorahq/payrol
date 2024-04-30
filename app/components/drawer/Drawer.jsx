import React from 'react'
import styles from "./drawer.module.scss"
import { MdOutlineCancel } from "react-icons/md";
import Sidebar from '../sidebar/Sidebar';

const Drawer = ({ isOpen, closeDrawer }) => {
    return (
        <div className={`${styles.drawerContainer} ${isOpen ? styles.open : ''}`}>
            <MdOutlineCancel className={styles.cancel} size={24} onClick={closeDrawer} />
            <Sidebar />
        </div>
    )
}

export default Drawer