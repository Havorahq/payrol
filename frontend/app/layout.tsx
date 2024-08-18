"use client";
import React from "react";
import { Providers } from "./providers";
import "./globals.css";
import "rsuite/DatePicker/styles/index.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}
