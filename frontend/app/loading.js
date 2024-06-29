"use client";

import { Oval } from "react-loader-spinner";
import Skeleton from "./components/common/skeleton/Skeleton";
import Preloader from "./components/common/preloader/Preloader";

export default function Loading() {
  return (
    <div className="center-vertical" style={{ width: "100%", height: "100%" }}>
      <Oval
        ariaLabel="loading-indicator"
        height={80}
        secondaryColor="#adb5bd"
        color={"#52bf"}
      />
    </div>
  );
}
