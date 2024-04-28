import React from 'react'
import Wrapper from '../components/wrapper/Wrapper'
import styles from "./profile.module.scss"

const Profile = () => {
  return (
    <Wrapper>
      <div className={styles.profileHeader}>
         <div></div>
         <p className="w-100">Profile</p>
         <div className={`${styles.addButton} x-axis gap-1`}>
          <div className="w-100">
            Contract
          </div>
         </div>
      </div>
    </Wrapper>
  )
}

export default Profile