import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";
import { useEffect } from "react";
import Styles from "@/styles/styles.module.css";
import { WalletIcon } from "@/components/icon/";
export const ConnectWallet = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();

  // If a wallet is connected, show address, chainId and disconnect button
  if (address) {
    if (network[0].data.chain) {
      if (network[0].data.chain.id !== 3 && network[0].data.chain.id !== 1337) {
        console.log("Network ", network);
        disconnectWallet();
      }
    }
    return (
      <button
        className={` ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal}`}
      >
        Authorize
      </button>
    );
  }

  // If no wallet is connected, show connect wallet options
  return (
    <button
      type="button"
      className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall}`}
      onClick={() => connectWithMetamask()}
    >
      <WalletIcon className={`${Styles.colorFgOnEmphasis} ${Styles.Octicon}`} />{" "}
      Connect Wallet
    </button>
  );
};
