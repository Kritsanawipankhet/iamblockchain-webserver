import React from "react";
import Styles from "@/styles/styles.module.css";

import {
  useNetwork,
  useAddress,
  useDisconnect,
  useCoinbaseWallet,
  useMetamask,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { WalletIcon } from "@/components/icon/";

type Props = {};

export default function OAuthAuthorize({}: Props) {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();

  if (address) {
    return (
      <>
        <form onSubmit={createAuthorize}>
          <div
            className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
          >
            <button
              type="button"
              onClick={() => disconnectWallet()}
              className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal}`}
            >
              Disconnect Wallet
            </button>
            <button
              type="button"
              className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall}`}
              onClick={() => connectWithMetamask()}
            >
              Authorize
            </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <div
        className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
      >
        <button
          type="button"
          className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal}`}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall}`}
          onClick={() => connectWithMetamask()}
        >
          <WalletIcon
            className={`${Styles.colorFgOnEmphasis} ${Styles.Octicon}`}
          />{" "}
          Connect Wallet
        </button>
      </div>
    </>
  );
}

const createAuthorize = (e: any) => {
  e.preventDefault();
  console.log("form");
};
