"use client";
import { Inter } from "next/font/google";
import "../styles/styles.scss";
import "react-datepicker/dist/react-datepicker.css";

import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Xalari",
//   description: "Payroll Management on the blockchain!",
// };

export default function RootLayout({ children }) {
  return (
    <ThirdwebProvider>
      <html lang="en">
        <body
          style={{
            minHeight: "100vh",
            display: "grid",
            placeContent: "center",
          }}
        >
          {children}
        </body>
      </html>
    </ThirdwebProvider>
  );
}
