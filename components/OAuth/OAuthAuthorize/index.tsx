import React, { useEffect, useState } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import Styles from "@/styles/styles.module.css";
import { WalletIcon } from "@/components/icon/";
import { useDisclosure } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import SelectWalletModal from "@/components/connectors/Modal";
import { connectors } from "@/components/connectors";
import { toHex, truncateAddress } from "@/libs/string";

type Props = {};
interface walletConnectType {
  injected: InjectedConnector;
  walletConnect: WalletConnectConnector;
  // coinbaseWallet: WalletLinkConnector;
}
let provider: keyof walletConnectType;
declare let window: any;
export default function OAuthAuthorize({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { library, chainId, account, activate, deactivate, active, error } =
    useWeb3React();
  const [network, setNetwork] = useState(undefined);

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
    setNetwork(undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  // useEffect(() => {
  //   provider = window.localStorage.getItem("provider");
  //   if (provider) {
  //     activate(connectors[provider]);
  //   }
  // }, []);
  return (
    <>
      <div
        className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
      >
        {!active ? (
          <button
            onClick={() => {}}
            type="button"
            className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal}`}
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={disconnect}
            className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal}`}
          >
            Disconnect Wallet
          </button>
        )}

        {!active ? (
          <button
            type="button"
            className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall}`}
            onClick={onOpen}
          >
            <WalletIcon
              className={`${Styles.colorFgOnEmphasis} ${Styles.Octicon}`}
            />{" "}
            Connect Wallet
          </button>
        ) : (
          <button
            type="button"
            className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall}`}
            onClick={() => {}}
          >
            Authorize
          </button>
        )}
      </div>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
}

const createAuthorize = (e: any) => {
  e.preventDefault();
  console.log(e);
  alert("Authorize");
  console.log("form");
};
