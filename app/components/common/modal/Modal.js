// components/Modal.js

import React from 'react';
import styles from './Modal.module.scss'; // Import SCSS module for styling
import { ImCancelCircle } from "react-icons/im";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.closeButton} onClick={onClose}>
            <ImCancelCircle color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
