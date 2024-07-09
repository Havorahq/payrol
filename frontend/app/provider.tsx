import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import Web3 from "web3";
import { lisk_testnet } from "../lib/network";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

const clientId = process.env.web3AuthClientId as string;

const chainConfig = {
  chainId: "4202", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.sepolia-api.lisk.com",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "Lisk Sepolia Testnet",
  blockExplorerUrl: "https://rpc.sepolia-api.lisk.com",
  ticker: "LISK",
  tickerName: "LISK",
  logo: "https://pbs.twimg.com/profile_images/1598818548641505280/Yg2XgSeH_400x400.jpg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const metamaskAdapter = new MetamaskAdapter({
  clientId,
  sessionTime: 3600, // 1 hour in seconds
  web3AuthNetwork: "sapphire_mainnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth",
  },
});

// it will add/update  the metamask adapter in to web3auth class
web3auth.configureAdapter(metamaskAdapter);

interface Web3AuthContextProps {
  provider: IProvider | null;
  loggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<void>;
  getAccounts: () => Promise<void>;
  getBalance: () => Promise<void>;
  signMessage: () => Promise<void>;
}

const Web3AuthContext = createContext<Web3AuthContextProps | undefined>(
  undefined
);

export const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    initWeb3Auth();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);
    const address = await web3.eth.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);
    const address = (await web3.eth.getAccounts())[0];
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address),
      "ether"
    );
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);
    const fromAddress = (await web3.eth.getAccounts())[0];
    const originalMessage = "YOUR_MESSAGE";
    const signedMessage = await web3.eth.personal.sign(
      originalMessage,
      fromAddress,
      "test password!"
    );
    uiConsole(signedMessage);
  };

  const uiConsole = (...args: any[]): void => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  };

  return (
    <Web3AuthContext.Provider
      value={{
        provider,
        loggedIn,
        login,
        logout,
        getUserInfo,
        getAccounts,
        getBalance,
        signMessage,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error("useWeb3Auth must be used within a Web3AuthProvider");
  }
  return context;
};
