"use client";
import Balance from "@/components/balance/page";
import { SendTransaction } from "@/components/send-transaction/page";
import SwitchChain from "@/components/switch-chain/page";
import WriteContract from "@/components/write-contract/page";
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
        <button
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          onClick={disconnect as any}
        >
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
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}
