import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { getOrMapViemChain } from "@dynamic-labs/utils";

export const evmNetworks = [
  {
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
    chainId: 97,
    chainName: "BNB Smart Chain Testnet",
    iconUrls: ["https://cryptologos.cc/logos/bnb-bnb-logo.png"],
    name: "BSC Testnet",
    nativeCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "tBNB",
    },
    networkId: 97,
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    vanityName: "BSC Testnet",
  },
];

export const config = createConfig({
  chains: [mainnet, ...evmNetworks.map(getOrMapViemChain)],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    ...Object.fromEntries(
      evmNetworks.map((network) => [network.chainId, http(network.rpcUrls[0])])
    ),
  },
});
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
