"use client"

import React from 'react'
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#F6F6F6"}}>
        <div className="center">
            <Oval
                height="130"
                width="130"
                color="#4039FA"
                ariaLabel="loading"
                />
        </div>
    </div>
  )
}

export default Loading