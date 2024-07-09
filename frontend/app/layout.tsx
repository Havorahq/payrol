"use client";
import React from "react";
import { Web3AuthProvider } from "./provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
        <Web3AuthProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Web3AuthProvider>
      </body>
    </html>
  );
}
