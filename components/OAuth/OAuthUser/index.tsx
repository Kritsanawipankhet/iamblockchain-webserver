import React from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "@/styles/styles.module.css";
import Index from "./index.module.css";
import { shortAddressEth } from "@/libs/string";
import { useAddress } from "@thirdweb-dev/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { UserIcon } from "@/components/icon/";

type Props = {
  clientName?: string;
  clientOwner?: string;
};

export default function OAuthUser({ clientName, clientOwner }: Props) {
  const address = useAddress();

  return (
    <div
      className={`${Styles.mb2} ${Styles.lhDefault} ${Styles.dFlex} ${Styles.flexContentCenter} ${Styles.flexItemsCenter} ${Styles.flexGap3}`}
    >
      <div className={`${Styles.mt1}`}>
        {address ? (
          <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
        ) : (
          <UserIcon
            className={`${Styles.OcticonNone} ${Styles.colorFgMutes}`}
            width={32}
            height={32}
          ></UserIcon>
        )}
        {/* <EthereumIcon width={32} height={32}></EthereumIcon> */}
      </div>
      <div>
        <strong>{clientName}</strong>
        {" by "}
        <strong>
          <Link href={`https://rinkeby.etherscan.io/address/${address}`}>
            <a target="_blank">
              {clientOwner ? shortAddressEth(clientOwner) : ""}
            </a>
          </Link>
        </strong>
        <small className={`${Styles.dBlock} ${Styles.colorFgMutes}`}>
          {address
            ? address
              ? `Wants to access your wallet account address `
              : ""
            : `Please connect your wallet account.`}
          {address ? (
            <Link href={`https://rinkeby.etherscan.io/address/${address}`}>
              <a target="_blank">
                <strong>{shortAddressEth(address)}</strong>
              </a>
            </Link>
          ) : (
            ""
          )}
        </small>
      </div>
    </div>
  );
}
