"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "../../lib/client";
import { generatePayload, isLoggedIn, login, logout } from "./actions/auth";

const ConnectButtonPage = () => {
  return (
    <ConnectButton
      client={client}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          setPublicAddress(address);
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);

          return { success: true };
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
};

export default ConnectButtonPage;
