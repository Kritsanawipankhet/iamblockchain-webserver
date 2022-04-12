import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";

// const CoinbaseWallet = new WalletLinkConnector({
//   appLogoUrl: `https://i.ibb.co/M27pHnw/iam.png`,
//   url: `https://rinkeby.infura.io/v3/81a30e2706b04f5489a74021a6a5ff42`,
//   appName: "IAM Blockchain",
//   supportedChainIds: [4],
//   darkMode: false,
// });

const WalletConnect = new WalletConnectConnector({
  //rpc: `${process.env.ETHEREUM_NETWORK}`,
  bridge: "https://bridge.walletconnect.org",
  infuraId: "81a30e2706b04f5489a74021a6a5ff42",
  qrcode: true,
  chainId: 3,
  supportedChainIds: [3],
  clientMeta: {
    name: "IAM Blockchain",
    description: "IAM Blockchain App",
    url: "https://iamblockchian.net",
    icons: ["https://i.ibb.co/M27pHnw/iam.png"],
  },
});

const Injected = new InjectedConnector({
  supportedChainIds: [3],
});

export const connectors = {
  injected: Injected,
  walletConnect: WalletConnect,
  // coinbaseWallet: CoinbaseWallet,
};
