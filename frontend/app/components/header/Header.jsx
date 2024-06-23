import React from "react";
import styles from "./header.module.scss";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useUserData from "@/app/hooks/useUserData";
import ClipLoader from "react-spinners/ClipLoader";
import Preloader from "../common/preloader/Preloader";

const Header = ({ toggleDrawer }) => {
  const { userData, isLoading, error } = useUserData();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return (
      <div 
        // style={{ width: "100px", margin: "auto", display: "block" }}
      >
        <Preloader height={45} />
      </div>
    );
  }

  const { email, first_name, last_name, public_address, user_type } = userData;
  return (
    <div>
      <div className={styles.mobileHeader}>
        <Image
          src="/icons/xalari_logo_dh.png"
          alt="brand logo"
          width={104}
          height={31}
        />
        <RiMenu4Fill size={20} className="cursor" onClick={toggleDrawer} />
      </div>
      <div className={styles.headerContainer}>
        <ConnectButton />
        <div className={`${styles.iconContainer} ${styles.ashBg}`}>
          <MdOutlineNotificationsNone size={20} />
        </div>
        <div className={styles.profileContainer}>
          <div className={`${styles.iconContainer} ${styles.primaryBg}`}>
            <p>
              {first_name[0]}
              {last_name[0]}
            </p>
          </div>
          <div className={styles.profileDetails}>
            <h5>
              {first_name} {last_name}
            </h5>
            <p>{user_type}</p>
          </div>
          {/* <FaCaretDown size={24} /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
