import React, { useEffect, useState } from "react";
import { walletConnectType } from "@/models/.";
import { useRouter, NextRouter } from "next/router";
import Styles from "@/styles/styles.module.css";
import { WalletIcon } from "@/components/icon/";
import { useDisclosure } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import SelectWalletModal from "@/components/connectors/Modal";
import { connectors } from "@/components/connectors";
import crypto from "crypto";
import { ethers } from "ethers";
import Abi from "@/ethereum/abi/IAM.json";
import Index from "./index.module.css";
type Props = {
  redirectUri: string;
};

let provider: keyof walletConnectType;
declare let window: any;
let activate: any;
let active: boolean;
let library: any;
let account: string | undefined | null;
let route: NextRouter;
let code: string;
export default function OAuthAuthorize({ redirectUri }: Props) {
  route = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainId, deactivate, error } = useWeb3React();
  const [receipt, getReceipt] = useState();
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

  const createAuthorize = async (e: any) => {
    e.preventDefault();
    const seed = crypto.randomBytes(256);
    code = crypto.createHash("sha1").update(seed).digest("hex");
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
          [route.query.scope],
          route.query.redirect_uri || "",
          expires
        );
        console.log(
          `Data Transfer : ${route.query.client_id} ,  ${code} , ${[
            "",
          ]} , ${expires}`
        );
        console.log("Tx : ", authorizeTx);
        getReceipt(await authorizeTx.wait());

        //console.log("Receipt : ", receipt);
      } catch (_e: any) {
        console.log(_e);
      }
      // console.log(library);
      // console.log(IAMContract);
    }
  };

  useEffect(() => {
    if (receipt) {
      console.log("get ", receipt);
      window.location.href = `${route.query.redirect_uri}?code=${code}&state=${route.query.state}`;
    }
  }, [receipt]);

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
              className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal} ${Index.btnAuthorize}`}
            >
              Disconnect Wallet
            </button>
            <button
              type="submit"
              className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall} ${Index.btnAuthorize}`}
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
          onClick={() => {
            if (route.query.redirect_uri) {
              window.location.href = `${route.query.redirect_uri}`;
            } else {
              window.location.href = `${redirectUri}`;
            }
          }}
          type="button"
          className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal} ${Index.btnAuthorize}`}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall} ${Index.btnAuthorize}`}
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
