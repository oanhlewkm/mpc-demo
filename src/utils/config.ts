"use client";
import { createConfig, http, createStorage, cookieStorage } from "wagmi";
import { bscTestnet, goerli, polygonZkEvmTestnet } from "viem/chains";
import { metaMask, walletConnect } from "wagmi/connectors";
import Web3AuthConnectorInstance from "@/utils/web3-auth-connector-instance";

export const projectId = "b7376566476128e77408a3e580c5f671";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create modal
export const config = createConfig({
  chains: [polygonZkEvmTestnet, goerli, bscTestnet],
  transports: {
    [polygonZkEvmTestnet.id]: http(),
    [goerli.id]: http(),
    [bscTestnet.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  multiInjectedProviderDiscovery: false,
  connectors: [
    metaMask(),
    walletConnect({ projectId, metadata, showQrModal: true }),
    Web3AuthConnectorInstance([goerli, polygonZkEvmTestnet, bscTestnet]),
  ],
});
