import React, { useEffect, useState, useMemo } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import { LayerIcon, LockIcon } from "@/components/icon";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import { PermissionDenied, NoApplication } from "@/components/Developer/";
import { walletConnectType } from "@/models/.";
import { ethers } from "ethers";
import Abi from "@/ethereum/abi/IAM.json";
import Image from "next/image";
import { FacebookIcon, GithubIcon } from "@/components/icon";
import { connectors } from "@/components/connectors";

type Props = {};

let provider: keyof walletConnectType;
declare let window: any;
let activate: any;
let active: boolean;
let library: any;
let account: any;
let IAMContract: ethers.Contract;
let signer: any;
let listClient: any;
export default function Developer({}: Props) {
  library = useWeb3React().library;
  activate = useWeb3React().activate;
  active = useWeb3React().active;
  account = useWeb3React().account;
  const [clientList, setClientList] = useState<any>([]);
  IAMContract = new ethers.Contract(
    process.env.IAM_CONTRACT_ADDRESS,
    Abi.abi,
    library
  );

  useEffect(() => {
    setClientList([]);
    const eventList = async () => {
      if (account) {
        signer = library.getSigner();

        const eventAddClient = await IAMContract.queryFilter(
          IAMContract.filters.AddClient(ethers.utils.getAddress(account), null)
        );

        const eventDelClient = await IAMContract.queryFilter(
          IAMContract.filters.DelClient(ethers.utils.getAddress(account), null)
        );

        const list = eventAddClient.filter(
          (e1: any) =>
            !eventDelClient.find(
              (e2: any) => e1.args._client_id === e2.args._client_id
            )
        );

        list.map(async (_v: any) => {
          console.log(_v);
          try {
            let _client = await IAMContract.connect(signer).getClientByOwner(
              _v.args._client_id
            );
            setClientList((clientList: any) => [...clientList, _client]);

            //console.log(_client);
          } catch (_error: any) {
            //console.log(_error);
          }
        });
      }
    };

    eventList().catch(console.error);
  }, [account]);

  useEffect(() => {
    provider = window.localStorage.getItem("provider");

    if (provider) {
      activate(connectors[provider]);
    }
  }, []);
  if (active) {
    return (
      <DeveloperLayout>
        <div
          className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
        >
          <div>
            <h1 className={Index.TitlePage}>OAuth Apps</h1>
            <p className={Index.SubTitlePage}>Applications that you have</p>
          </div>
          <Link href="/developer/oauth/create">
            <a>
              <button
                className={`${Styles.btn} ${Styles.btnPrimary} ${Index.btnCreateOAuth}`}
              >
                <LayerIcon className={`${Styles.Octicon} ${Styles.mr1}`} /> New
                OAuth App
              </button>
            </a>
          </Link>
        </div>
        <div className={Index.divider}></div>
        <div className={`${Index.ClientList}`}>
          <ul>
            {/* <li className={``}>
              <div
                className={`${Styles.dFlex} ${Styles.flexItemsStart} ${Styles.flexGap3}`}
              >
                <div
                  className={`${Index.CircleBadgeMedium} ${Styles.overflowHidden}`}
                >
                  <Image
                    src="/iam.svg"
                    alt="IAM"
                    width={64}
                    height={64}
                    className={`${Index.AvatarUser} `}
                  />
                </div>

                <div className={`${Styles.widthFull}`}>
                  <Link href={`/developer/oauth/client/`}>
                    <a className={`${Index.ClientName}`}>{"IAM To do"}</a>
                  </Link>
                  <p className={`${Index.ClientDescription}`}>
                    {`IAM To do Authentication Apps`}
                  </p>
                </div>
              </div>
            </li> */}
            {clientList.length > 0 ? (
              clientList.map((client: any, index: any) => (
                <li className={``} key={index}>
                  <div
                    className={`${Styles.dFlex} ${Styles.flexItemsStart} ${Styles.flexGap3}`}
                  >
                    <div
                      className={`${Index.CircleBadgeMedium} ${Styles.overflowHidden}`}
                    >
                      {client.client_id === process.env.CLIENT_OP ? (
                        <Link
                          href={`/developer/oauth/client/${client.client_id}`}
                        >
                          <a>
                            <Image
                              src="/iam.svg"
                              alt="IAM"
                              width={64}
                              height={64}
                              className={`${Index.AvatarUser} `}
                            />
                          </a>
                        </Link>
                      ) : (
                        <Link
                          href={`/developer/oauth/client/${client.client_id}`}
                        >
                          <a>
                            <Image
                              src={Buffer.from(
                                client.client_logo,
                                "base64"
                              ).toString("ascii")}
                              width={64}
                              height={64}
                              alt="Application"
                              className={`${Index.AvatarUser} `}
                            />
                          </a>
                        </Link>
                      )}
                      {/* {client.client_logo ? (
                        <Link
                          href={`/developer/oauth/client/${client.client_id}`}
                        >
                          <a>
                            <Image
                              src={Buffer.from(
                                client.client_logo,
                                "base64"
                              ).toString("ascii")}
                              width={64}
                              height={64}
                              alt="Application"
                              className={`${Index.AvatarUser} `}
                            />
                          </a>
                        </Link>
                      ) : (
                        <Image
                          src="/eth.png"
                          alt="Etheruem"
                          width={64}
                          height={64}
                          className={`${Index.AvatarUser} `}
                        />
                      )} */}
                    </div>

                    <div className={`${Styles.widthFull}`}>
                      <Link
                        href={`/developer/oauth/client/${client.client_id}`}
                      >
                        <a className={`${Index.ClientName}`}>
                          {client.client_name}
                        </a>
                      </Link>
                      <p className={`${Index.ClientDescription}`}>
                        {client.client_description}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <NoApplication></NoApplication>
            )}
          </ul>
        </div>
      </DeveloperLayout>
    );
  }
  return (
    <DeveloperLayout>
      <PermissionDenied></PermissionDenied>
    </DeveloperLayout>
  );
}
