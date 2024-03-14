import { CHAIN_NAMESPACES } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { Chain, polygonZkEvmTestnet } from "wagmi/chains";

export const APP_NAME = "My App Name";

export const CHAINS: Chain[] =
  process.env.NODE_ENV === "development" ? [polygonZkEvmTestnet] : [];

export const CHAIN_CONFIG = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x" + CHAINS[0].id.toString(16),
  rpcTarget: CHAINS[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
  displayName: CHAINS[0].name,
  tickerName: CHAINS[0].nativeCurrency?.name,
  ticker: CHAINS[0].nativeCurrency?.symbol,
  blockExplorerUrl: CHAINS[0].blockExplorers?.default.url[0] as string,
};

export const PRIVATE_KEY_PROVIDER = new EthereumPrivateKeyProvider({
  config: { chainConfig: CHAIN_CONFIG },
});

export const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_PROJECT_ID as string;
