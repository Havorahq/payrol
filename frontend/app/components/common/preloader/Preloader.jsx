import React from "react";
import { Oval } from "react-loader-spinner";
import style from "./preloader.module.scss";

const Preloader = ({ height }) => {

  return (
    <div className={style.section}>
      <Oval
        ariaLabel="loading-indicator"
        height={height || 45}
        secondaryColor="#adb5bd"
        color={"#52bf"}
      />
    </div>
  );
};

export default Preloader;
