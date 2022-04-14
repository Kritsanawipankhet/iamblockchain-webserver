import React, { useState } from "react";
import Error from "next/error";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { ethersGetClientById } from "../../ethereum";
import { TClient, TAuthorize } from "../../models";
import { AuthLayout } from "@/components/layouts/auth";
import Styles from "@/styles/styles.module.css";
import Index from "@/styles/oauth.module.css";
import {
  OAuthAuthorize,
  OAuthChain,
  OAuthUser,
  OAuthClientDescription,
  OAuthDashedConnection,
  OAuthPermission,
  OAuthRedirect,
} from "@/components/OAuth";
import Link from "next/link";
import LoadingOverlay from "@/components/LoadingOverlay";

type Props = {
  client: TClient;
  params: TAuthorize;
};

export default function Authorize({ client, params }: Props) {
  const [loading, setLoading] = useState(false);
  if (client.error) {
    return <Error statusCode={client.error_code || 400} />;
  }

  return (
    <AuthLayout>
      <LoadingOverlay Loading={loading}></LoadingOverlay>
      <div className={Styles.mxAuto} style={{ maxWidth: "530px" }}>
        <div className={`${Styles.px3} ${Styles.pt6}`}>
          <OAuthDashedConnection />
          <h2
            className={`${Styles.m0} ${Styles.f2} ${Styles.textNormal} ${Styles.textCenter} ${Styles.lhCondensed}  ${Styles.mb4}`}
          >
            Authorize {client.client_name}
          </h2>
        </div>
        <div className={`${Styles.px3} ${Styles.mt5}`}>
          <div className={`${Index.Box} ${Styles.colorShadowSmall}`}>
            <div className={`${Index.BoxBody} ${Styles.p3} ${Styles.pMd4}`}>
              <OAuthUser
                clientName={client.client_name}
                clientOwner={client.client_owner}
              ></OAuthUser>
              <OAuthChain></OAuthChain>
            </div>
            <div
              className={`${Index.BoxFooter} ${Styles.p3} ${Styles.pMd4} ${Styles.clearfix}`}
            >
              <OAuthAuthorize></OAuthAuthorize>
              <OAuthRedirect redirectUri={client.redirect_uri}></OAuthRedirect>
            </div>
          </div>
          <OAuthClientDescription
            clientName={client.client_name}
            createDate={client.create_date}
          ></OAuthClientDescription>
          <div className={`${Styles.textCenter} ${Styles.my3}`}>
            <Link href="/">
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
  console.log(queryParams);
  let client: TClient = await ethersGetClientById(queryParams.client_id);
  // if (queryParams.redirect_uri) {
  //   if (queryParams.redirect_uri != client.redirect_uri) {
  //     client.error_code = 400;
  //     client.error_description =
  //       "The redirect_uri must match the registered callback URL for this application";
  //     return { props: { error: client } };
  //   }
  // }
  return { props: { client: client, params: queryParams } };
};
