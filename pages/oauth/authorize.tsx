import React, { useState } from "react";
import Error from "next/error";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { ethersGetClientById } from "../../ethereum";
import { TClient, TAuthorize } from "../../models";
import { AuthLayout } from "@/components/layouts/auth";
import Styles from "@/styles/styles.module.css";
import Index from "@/styles/auth.module.css";
import DashedConnection from "@/components/DashedConnection";
import OAuthPermission from "@/components/OAuthPermission";
import OAuthAuthorize from "@/components/OAuthAuthorize";
import Link from "next/link";
import {
  CircleSlashIcon,
  ClockIcon,
  OrganizationIcon,
  WalletIcon,
  EthereumIcon,
} from "@/components/icon/";
import { ConnectWallet } from "@/components/ConnectWallet";
import moment from "moment";
import { shortAddressEth, urlDomainFormat } from "@/libs/string";
import { useAddress } from "@thirdweb-dev/react";

type Props = {
  client: TClient;
};

export default function Authorize({ client }: Props) {
  const address = useAddress();

  if (client.error) {
    return <Error statusCode={client.error_code || 400} />;
  }

  return (
    <AuthLayout>
      <div className={Styles.mxAuto} style={{ maxWidth: "530px" }}>
        <div className={`${Styles.px3} ${Styles.pt4}`}>
          <DashedConnection />
          <h2
            className={`${Styles.m0} ${Styles.f2} ${Styles.textNormal} ${Styles.textCenter} ${Styles.lhCondensed}  ${Styles.mb4}`}
          >
            Authorize {client.client_name}
          </h2>
        </div>
        <div className={`${Styles.px3} ${Styles.mt5}`}>
          <div className={`${Index.Box} ${Styles.colorShadowSmall}`}>
            <div className={`${Index.BoxBody} ${Styles.p3} ${Styles.pMd4}`}>
              <div
                className={`${Styles.mb2} ${Styles.lhDefault} ${Styles.dFlex} ${Styles.flexContentCenter} ${Styles.flexItemsCenter} ${Styles.flexGap3}`}
              >
                <div className={`${Styles.mt1}`}>
                  <Image
                    src="/eth-icon.png"
                    alt="Ethereum"
                    width={32}
                    height={32}
                    className={`${Index.Avatar} ${Index.AvatarUser} `}
                  />
                  {/* <EthereumIcon width={32} height={32}></EthereumIcon> */}
                </div>
                <div>
                  <strong>{client.client_name}</strong>
                  {" by "}
                  <strong>
                    <Link
                      href={`https://ropsten.etherscan.io/address/${address}`}
                    >
                      <a target="_blank">
                        {client.client_owner
                          ? shortAddressEth(client.client_owner)
                          : ""}
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
                      <Link
                        href={`https://ropsten.etherscan.io/address/${address}`}
                      >
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
              <div>
                <OAuthPermission type=""></OAuthPermission>
              </div>
            </div>
            <div
              className={`${Index.BoxFooter} ${Styles.p3} ${Styles.pMd4} ${Styles.clearfix}`}
            >
              <OAuthAuthorize></OAuthAuthorize>
              <div className={Styles.mt2}>
                <p
                  className={`${Styles.textCenter} ${Styles.textSmall} ${Styles.colorFgMutes} ${Styles.mb0}`}
                >
                  Authorizing will redirect to <br></br>
                  <strong className={Styles.colorFgDefault}>
                    {urlDomainFormat(client.redirect_uri)}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${Index.Box} ${Styles.colorBgSubtle} ${Styles.px4} ${Styles.py3} ${Styles.mt3} ${Styles.textSmall} ${Styles.colorFgMutes} ${Styles.clearfix} ${Styles.dFlex} ${Styles.flexGap3} ${Styles.flexJustifyBetween}`}
          >
            <div className={`${Styles.dFlex} ${Styles.flexGap2}`}>
              <CircleSlashIcon
                className={`${Styles.Octicon}`}
              ></CircleSlashIcon>
              <div>
                <strong>Not </strong>
                <span>owned or operated by IAM</span>
              </div>
            </div>
            <div className={`${Styles.dFlex} ${Styles.flexGap2}`}>
              <ClockIcon className={`${Styles.Octicon}`}></ClockIcon>
              <div>
                <strong>Created </strong>
                <span className={Styles.dInlineBlock}>
                  {moment(new Date(client.create_date * 1000)).fromNow()}
                </span>
              </div>
            </div>
            <div className={`${Styles.dFlex} ${Styles.flexGap2}`}>
              <OrganizationIcon
                className={`${Styles.Octicon}`}
              ></OrganizationIcon>
              <div>
                <strong>Fewer than 10 </strong>
                <span>IAM users</span>
              </div>
            </div>
          </div>
          <div className={`${Styles.textCenter} ${Styles.my3}`}>
            <Link href="#">
              <a className={`${Styles.textSmall} ${Styles.linkMuted}`}>
                Learn more about OAuth
              </a>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryParams = context.query as TAuthorize;
  const client: TClient = await ethersGetClientById(queryParams.client_id);

  // if (queryParams.redirect_uri) {
  //   if (queryParams.redirect_uri != client.redirect_uri) {
  //     client.error_code = 400;
  //     client.error_description =
  //       "The redirect_uri must match the registered callback URL for this application";
  //     return { props: { error: client } };
  //   }
  // }
  return { props: { client: client } };
};
