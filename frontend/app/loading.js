"use client"

import React from 'react'
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
        <div className="center" style={{ width: "100vw", height: "100vh", background: "#F6F6F6"}}>
            <Oval
                height="130"
                width="130"
                color="#4039FA"
                secondaryColor="#ddd"
                ariaLabel="loading"
                />
        </div>
    </div>
  )
}

export default Loading