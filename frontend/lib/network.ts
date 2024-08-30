export const lisk_testnet = {
  id: 4202,
  name: "Lisk Sepolia Testnet",
  network: "lisk",
  iconUrl:
    "https://pbs.twimg.com/profile_images/1598818548641505280/Yg2XgSeH_400x400.jpg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Etherium",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.sepolia-api.lisk.com"] },
    default: { http: ["https://rpc.sepolia-api.lisk.com"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://sepolia-blockscout.lisk.com" },
  },
  contracts: {},
  testnet: true,
};

export const chains = [
  {
    name: "Ethereum (ETH)",
    chainId: "1",
    picture: "https://app.dynamic.xyz/assets/networks/eth.svg",
  },
  {
    name: "Binance Smart Chain (BSC)",
    chainId: "56",
    picture: "https://app.dynamic.xyz/assets/networks/bsc.svg",
  },
  {
    name: "Solana (SOL)",
    chainId: "1399811149", // Solana doesn't use EVM-style chain IDs, this is a placeholder
    picture: "https://app.dynamic.xyz/assets/networks/solana.svg",
  },
  {
    name: "Optimism",
    chainId: "10",
    picture: "https://app.dynamic.xyz/assets/networks/optimism.svg",
  },
  {
    name: "Arbitrum",
    chainId: "42161",
    picture: "https://app.dynamic.xyz/assets/networks/arbitrum.svg",
  },
];
