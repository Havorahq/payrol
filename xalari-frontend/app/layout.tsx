"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "rsuite/DatePicker/styles/index.css";
import "sweetalert2/src/sweetalert2.scss";

// export const metadata: Metadata = {
//   title: "Xalari",
//   description: "Payroll Management on the blockchain!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
