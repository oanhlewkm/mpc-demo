"use client";
import MFA from "@/components/MFA";
import Balance from "@/components/balance";
import SendTransaction from "@/components/send-transaction";
import SignMessage from "@/components/sign-message";
import SwitchChain from "@/components/switch-chain";
import {
  CHAINS,
  CHAIN_CONFIG,
  CLIENT_ID,
  PRIVATE_KEY_PROVIDER,
} from "@/utils/constant";
import Web3AuthConnectorInstance from "@/utils/web3-auth-connector-instance";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const connectorsName = {
  metamask: "MetaMask",
  web3Auth: "Web3Auth",
};

const { web3AuthInstance } = Web3AuthConnectorInstance(CHAINS);

export default function Home() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    const init = async () => {
      await web3AuthInstance.initModal();
      if (web3AuthInstance.connected) {
        const result = await web3AuthInstance.getUserInfo();
        console.log("getUserInfo", result);
        if (result) setUserInfo(result);
      }
    };
    if (!isConnected) return;
    init();
  }, [isConnected]);

  if (isConnected) {
    return (
      <div className="main flex min-h-screen flex-col items-center justify-between p-24">
        <div className="title">Connected to {connector?.name}</div>
        <div>{address}</div>
        <div className="flex flex-row space-x-5 items-center justify-center p-4 main">
          <button
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            onClick={disconnect as any}
          >
            Disconnect
          </button>
          {connector?.name === connectorsName.web3Auth &&
            userInfo &&
            !userInfo?.isMfaEnabled && <MFA web3Auth={web3AuthInstance} />}
        </div>
        <SendTransaction />
        <Balance />
        <SwitchChain />
        <SignMessage />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex min-h-screen flex-row space-x-5 items-center justify-center p-24 main">
          {connectors.map((connector) => {
            return (
              <div key={connector.id}>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  type="button"
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                </button>
              </div>
            );
          })}
        </div>
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}
