import React, { useEffect, useState } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { useRouter, NextRouter } from "next/router";
import Styles from "@/styles/styles.module.css";
import { WalletIcon } from "@/components/icon/";
import { useDisclosure } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import SelectWalletModal from "@/components/connectors/Modal";
import { connectors } from "@/components/connectors";
import { toHex, truncateAddress } from "@/libs/string";
import crypto from "crypto";
import { ethers } from "ethers";
import Abi from "@/ethereum/abi/IAM.json";
import { waitForDebugger } from "inspector";

type Props = {};

interface walletConnectType {
  injected: InjectedConnector;
  walletConnect: WalletConnectConnector;
  // coinbaseWallet: WalletLinkConnector;
}

let provider: keyof walletConnectType;
declare let window: any;
let activate: any;
let active: boolean;
let library: any;
let account: string | undefined | null;
let route: NextRouter;

export default function OAuthAuthorize({}: Props) {
  route = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainId, deactivate, error } = useWeb3React();
  library = useWeb3React().library;
  activate = useWeb3React().activate;
  active = useWeb3React().active;
  account = useWeb3React().account;
  const [network, setNetwork] = useState(undefined);

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
    setNetwork(undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  useEffect(() => {
    provider = window.localStorage.getItem("provider");
    if (provider) {
      activate(connectors[provider]);
    }
  }, []);
  if (active)
    return (
      <>
        <form id="authorize" onSubmit={createAuthorize}>
          <div
            className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
          >
            <button
              type="button"
              onClick={disconnect}
              className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal}`}
            >
              Disconnect Wallet
            </button>
            <button
              type="submit"
              className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall}`}
            >
              Authorize
            </button>
          </div>
        </form>
      </>
    );
  return (
    <>
      <div
        className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
      >
        <button
          onClick={() => {}}
          type="button"
          className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal}`}
        >
          Cancel
        </button>
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
      </div>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
}

const createAuthorize = async (e: any) => {
  e.preventDefault();
  const seed = crypto.randomBytes(256);
  const code = crypto.createHash("sha1").update(seed).digest("hex");
  const expires = 3600 * 24 * 30;
  if (active) {
    const IAMContract: ethers.Contract = new ethers.Contract(
      process.env.IAM_CONTRACT_ADDRESS,
      Abi.abi,
      library
    );
    const signer = library.getSigner();
    try {
      const authorizeTx = await IAMContract.connect(signer).createAuthorize(
        route.query.client_id,
        code,
        [""],
        route.query.redirect_uri || "",
        expires
      );
      console.log(
        `Data Transfer : ${route.query.client_id} ,  ${code} , ${[
          "",
        ]} , ${expires}`
      );
      console.log("Tx : ", authorizeTx);
      const receipt = await authorizeTx.wait();
      console.log("Receipt : ", receipt);
    } catch (_e: any) {
      console.log(_e);
    }
    console.log(library);
    console.log(IAMContract);
  }
};
