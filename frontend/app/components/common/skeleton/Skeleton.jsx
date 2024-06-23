import React from 'react'
import styles from "./skeleton.module.scss"

const Skeleton = () => {
  return (
    <div className={styles.section}>
      <div className="x-axis">
        <div className={styles.sidebar} />
        <div className="padded w-100">
          <div className={styles.header} />
          <div className={styles.body} />
        </div>
      </div>
    </div>
  );
}

export default Skeleton