import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export interface walletConnectType {
  injected: InjectedConnector;
  walletConnect: WalletConnectConnector;
  // coinbaseWallet: WalletLinkConnector;
}
