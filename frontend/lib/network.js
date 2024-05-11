export const lisk_testnet = {
  id: 	4202,
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