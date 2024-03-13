// Web3Auth Libraries
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { Chain } from "wagmi/chains";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  // Create Web3Auth Instance
  const name = "My App Name";
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3AuthInstance = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_PROJECT_ID as string,
    chainConfig,
    privateKeyProvider,
    uiConfig: {
      loginMethodsOrder: [""],
      appName: name,
      defaultLanguage: "en",
      modalZIndex: "2147483647",
      logoLight: "https://web3auth.io/images/web3authlog.png",
      logoDark: "https://web3auth.io/images/web3authlogodark.png",
      uxMode: "redirect",
      mode: "light",
      loginGridCol: 2,
      primaryButton: "externalLogin",
    },
    web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
    enableLogging: true,
  });

  const walletServicesPlugin = new WalletServicesPlugin({
    walletInitOptions: {
      whiteLabel: {
        showWidgetButton: false,
      },
    },
  });
  web3AuthInstance.addPlugin(walletServicesPlugin);

  const modalConfig = {
    [WALLET_ADAPTERS.OPENLOGIN]: {
      label: "openlogin",
      mainOption: ["google"],
      loginMethods: {
        discord: { name: "Discord", showOnModal: false },
        email_passwordless: { name: "Email", showOnModal: false },
        facebook: { name: "facebook login", showOnModal: false },
        farcaster: { name: "Farcaster", showOnModal: false },
        github: { name: "Github", showOnModal: false },
        kakao: { name: "Kakao", showOnModal: false },
        line: { name: "Line", showOnModal: false },
        linkedin: { name: "Linkedin", showOnModal: false },
        reddit: { name: "Reddit", showOnModal: false },
        sms_passwordless: { name: "Mobile", showOnModal: false },
        twitch: { name: "Twitch", showOnModal: false },
        twitter: { name: "Twitter", showOnModal: false },
        wechat: { name: "Wechat", showOnModal: false },
        weibo: { name: "Weibo", showOnModal: false },
      },
      // setting it to false will hide all social login methods from modal.
    },
  };

  return Web3AuthConnector({
    web3AuthInstance,
    modalConfig,
  });
}
