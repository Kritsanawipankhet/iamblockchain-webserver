import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
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
import * as loadingData from "@/components/LoadingOverlay/loading.json";
import FadeIn from "react-fade-in";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { WalletIcon } from "@/components/icon/";
import { useDisclosure } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { walletConnectType } from "@/models/.";
import SelectWalletModal from "@/components/connectors/Modal";
import { connectors } from "@/components/connectors";
import crypto from "crypto";
import { ethers } from "ethers";
import Abi from "@/ethereum/abi/IAM.json";
import { makeClientSecret } from "@/libs/string";

type Props = {
  client: TClient;
  params: TAuthorize;
};

let provider: keyof walletConnectType;
declare let window: any;
let activate: any;
let active: boolean;
let library: any;
let account: string | undefined | null;
let route: NextRouter;
let code: string;
let IAMContract: ethers.Contract;

export default function Authorize({ client, params }: Props) {
  route = useRouter();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainId, deactivate, error } = useWeb3React();
  const [receipt, getReceipt] = useState();
  library = useWeb3React().library;
  activate = useWeb3React().activate;
  active = useWeb3React().active;
  account = useWeb3React().account;
  IAMContract = new ethers.Contract(
    process.env.IAM_CONTRACT_ADDRESS,
    Abi.abi,
    library
  );

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

  useEffect(() => {
    createAccessToken();
  }, [active]);

  const createAccessToken = async () => {
    const expires = 3600 * 24 * 30;
    if (active) {
      const signer = library.getSigner();
      try {
        const authorizeTx = await IAMContract.connect(signer).createAccessToken(
          route.query.client_id,
          route.query.code,
          makeClientSecret(64),
          makeClientSecret(64),
          ["user"],
          expires
        );
        // console.log(
        //   `Data Transfer : ${route.query.client_id} ,  ${code} , ${[
        //     "",
        //   ]} , ${expires}`
        // );
        //console.log("Tx : ", authorizeTx);

        setLoading(true);

        const receipt = await authorizeTx.wait();
        setTimeout(() => {
          if (receipt) {
            console.log("Receipt : ", receipt);

            window.location.href = `${route.query.redirect_uri}?client_id=${
              route.query.client_id
            }&scope=${"user"}&redirect_uri=${client.redirect_uri}&code=${
              route.query.code
            }&state=${route.query.state}`;
            //setLoading(false);
          }
        }, 1000);

        //console.log("Receipt : ", receipt);
      } catch (_e: any) {
        // setBtnDisable(false);
        setLoading(false);
        console.log(_e);
      }
      // console.log(library);
      // console.log(IAMContract);
    }
  };
  if (client.error) {
    return <Error statusCode={client.error_code || 400} />;
  }

  return (
    <AuthLayout>
      {loading ? (
        <FadeIn>
          <div className={Styles.loadingContent}>
            <Lottie
              animationData={loadingData}
              loop
              autoplay
              width="80"
              height="80"
            />
          </div>
        </FadeIn>
      ) : (
        <div className={Styles.mxAuto} style={{ maxWidth: "530px" }}>
          <div className={`${Styles.px3} ${Styles.pt6}`}>
            <OAuthDashedConnection
              applicationLogo={client.client_logo}
              clientId={route.query.client_id}
            />
            <h2
              className={`${Styles.m0} ${Styles.f2} ${Styles.textNormal} ${Styles.textCenter} ${Styles.lhCondensed}  ${Styles.mb4}`}
            >
              Confrim Authorize {client.client_name}
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
                {active ? (
                  <form id="authorize">
                    <div
                      className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          window.location.href = `${route.query.redirect_uri}`;
                        }}
                        className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal} ${Index.btnAuthorize}`}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall} ${Index.btnAuthorize}`}
                        onClick={() => {
                          createAccessToken();
                        }}
                      >
                        Confirm Authorize
                      </button>
                    </div>
                  </form>
                ) : (
                  <div
                    className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
                  >
                    <button
                      onClick={() => {
                        window.location.href = `${route.query.redirect_uri}`;
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
                )}
                <OAuthRedirect
                  redirectUri={client.client_homepage}
                ></OAuthRedirect>
              </div>
            </div>
            <OAuthClientDescription
              clientName={client.client_name}
              createDate={client.create_date}
              clientId={route.query.client_id}
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
      )}
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryParams = context.query as TAuthorize;
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
