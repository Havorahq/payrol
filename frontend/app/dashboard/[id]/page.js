import Button from "../../components/common/button/Button";
import Wrapper from "../../components/wrapper/Wrapper";
import React from "react";
import styles from "./styles.module.scss";
import { capitalizeFirst } from "../../../plugins/utils";

const ContractDetail = () => {
  return (
    <Wrapper>
      <div style={{ padding: 50 }}>
        <h1>Contract Details📄</h1>
        <p className={styles.desc}>Details of your contract below</p>
        {/* <Image src="/images/step_5.png" alt='step' width={540} height={7} /> */}
        <div className={`${styles.hr} py-1 mt-1`}>
          <p className="label">Contract Type</p>
          <p className="text-small w-70 greyText">
            {capitalizeFirst("Placeholder")}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Employee Name</p>
          <p className="text-small w-70 greyText">
            {capitalizeFirst("Placeholder")}
          </p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Employee Email</p>
          <p className="text-small w-70 greyText">{"Placeholder"}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Job Title</p>
          <p className="text-small w-70 greyText">{"Placeholder"}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Job Description</p>
          <p className="text-small w-70 greyText">{"Placeholder"}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Start date</p>
          <p className="text-small w-70 greyText">{"Placeholder"}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">End date</p>
          <p className="text-small w-70 greyText">{"Placeholder"}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Monthly Rate </p>
          <p className="text-small w-70 greyText">{"Placeholder"}</p>
        </div>
        <div className={`${styles.hr} py-1`}>
          <p className="label">Wallet Address </p>
          <p className="text-small w-70 greyText">{"Placeholder"}</p>
        </div>
        {/* <Button label="Accept Contract" onClick={() => {openModal(); handleSubmit()}} /> */}
      </div>
    </Wrapper>
  );
};

export default ContractDetail;
