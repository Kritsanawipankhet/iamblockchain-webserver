import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "@/styles/styles.module.css";
import Index from "./index.module.css";
import { shortAddressEth, toHex, truncateAddress } from "@/libs/string";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { UserIcon } from "@/components/icon/";
import { useWeb3React } from "@web3-react/core";
import { Tooltip } from "@chakra-ui/react";
import { ethers } from "ethers";
type Props = {
  clientName?: string;
  clientOwner?: string;
};

export default function OAuthUser({ clientName, clientOwner }: Props) {
  const { account, active } = useWeb3React();

  return (
    <div
      className={`${Styles.mb2} ${Styles.lhDefault} ${Styles.dFlex} ${Styles.flexContentCenter} ${Styles.flexItemsCenter} ${Styles.flexGap3}`}
    >
      <div className={`${Styles.mt1}`}>
        {active ? (
          <Jazzicon diameter={32} seed={jsNumberForAddress(account || "")} />
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
          <Link
            href={`https://rinkeby.etherscan.io/address/${clientOwner}`}
            passHref
          >
            <Tooltip
              label={ethers.utils.getAddress(clientOwner || "")}
              placement="right"
            >
              <a target="_blank">
                {clientOwner
                  ? truncateAddress(ethers.utils.getAddress(clientOwner))
                  : ""}
              </a>
            </Tooltip>
          </Link>
        </strong>
        <small className={`${Styles.dBlock} ${Styles.colorFgMutes}`}>
          {active
            ? active
              ? `Wants to access your wallet account address `
              : ""
            : `Please connect your wallet account.`}
          {active ? (
            <Link
              href={`https://rinkeby.etherscan.io/address/${account}`}
              passHref
            >
              <Tooltip
                label={ethers.utils.getAddress(account || "")}
                placement="right"
              >
                <a target="_blank">
                  <strong>
                    {truncateAddress(ethers.utils.getAddress(account || ""))}
                  </strong>
                </a>
              </Tooltip>
            </Link>
          ) : (
            ""
          )}
        </small>
      </div>
    </div>
  );
}
