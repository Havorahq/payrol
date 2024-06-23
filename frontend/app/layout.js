"use client";
import { Inter } from "next/font/google";
import "../styles/styles.scss";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/src/sweetalert2.scss";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  lisk_testnet,
} from "../lib/network";

const { chains, publicClient } = configureChains(
  [
    lisk_testnet,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Wordana",
  projectId: "b1ca4e750e5de2aa789e1b2533d92ac4",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const inter = Inter({ subsets: ["latin"] });

// const metadata = {
//   title: "Xalari",
//   description: "Payroll Management on the blockchain!",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} initialChain={lisk_testnet.id}>
           
              <main>{children}</main>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
