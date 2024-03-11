"use client";
import Balance from "@/components/balance/page";
import SendTransaction from "@/components/send-transaction/page";
import SwitchChain from "@/components/switch-chain/page";
import WriteContract from "@/components/write-contract/page";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Home() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="main flex min-h-screen flex-col items-center justify-between p-24">
        <div className="title">Connected to {connector?.name}</div>
        <div>{address}</div>
        <button className="card" onClick={disconnect as any}>
          Disconnect
        </button>
        <SendTransaction />
        <Balance />
        <WriteContract />
        <SwitchChain />
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24 main">
        {connectors.map((connector) => {
          return (
            <button
              className="card"
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </button>
          );
        })}
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}
