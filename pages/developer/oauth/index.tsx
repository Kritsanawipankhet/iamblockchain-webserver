import React, { useEffect, useState } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import { LayerIcon, LockIcon } from "@/components/icon";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import { PermissionDenied, NoApplication } from "@/components/Developer/";
type Props = {};
import { ethers } from "ethers";
import Abi from "@/ethereum/abi/IAM.json";
import Image from "next/image";
import { FacebookIcon, GithubIcon } from "@/components/icon";

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
  useEffect(() => {
    const getEventList = async () => {
      if (account) {
        setClientList([]);
        IAMContract = new ethers.Contract(
          process.env.IAM_CONTRACT_ADDRESS,
          Abi.abi,
          library
        );

        signer = library.getSigner();

        const filterAddClient = IAMContract.filters.AddClient(
          ethers.utils.getAddress(account),
          null,
          null
        );
        const filterDelClient = IAMContract.filters.DelClient(
          ethers.utils.getAddress(account),
          null,
          null
        );
        const eventAddClient = await IAMContract.queryFilter(
          filterAddClient,
          0,
          "latest"
        );
        const eventDelClient = await IAMContract.queryFilter(
          filterDelClient,
          0,
          "latest"
        );

        const list = eventAddClient.filter(
          (e1: any) =>
            !eventDelClient.find(
              (e2: any) => e1.args._client_id === e2.args._client_id
            )
        );
        list.forEach(async (_v: any) => {
          try {
            let _client = await IAMContract.connect(signer).getClientByOwner(
              _v.args._client_id
            );
            setClientList((clientList: any) => [...clientList, _client]);
          } catch (_error: any) {
            console.log(_error);
          }
        });

        // console.log(filterAddClient);
        // console.log("AddEvent : ", eventAddClient);
        // console.log("DelEvent : ", eventDelClient);
        // console.log("List ", list);
      }
    };

    getEventList().catch(console.error);
  }, [account]);

  if (active) {
    return (
      <DeveloperLayout>
        <div
          className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
        >
          <h1 className={Index.TitlePage}>OAuth Apps</h1>
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
            <li className={``}>
              <div
                className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexGap3}`}
              >
                <Link href="/developer/oauth/client/">
                  <a>
                    <FacebookIcon
                      className={`${Styles.Octicon}`}
                      width={64}
                      height={64}
                    />
                  </a>
                </Link>
                <div className={`${Styles.widthFull}`}>
                  <Link href="/developer/oauth/client/">
                    <a className={`${Index.ClientName}`}>IAM To Do</a>
                  </Link>
                  <p className={`${Index.ClientDescription}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum nobis aspernatur laboriosam labore, minima
                    inventore!
                  </p>
                </div>
              </div>
            </li>
            <li className={``}>
              <div
                className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexGap3}`}
              >
                <GithubIcon
                  className={`${Styles.Octicon}`}
                  width={64}
                  height={64}
                />
                <div className={`${Styles.widthFull}`}>
                  <p className={`${Index.ClientName}`}>IAM To Do</p>
                  <p className={`${Index.ClientDescription}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi, atque.
                  </p>
                </div>
              </div>
            </li>
            <li className={``}>
              <div
                className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexGap3}`}
              >
                <FacebookIcon
                  className={`${Styles.Octicon}`}
                  width={64}
                  height={64}
                />
                <div className={`${Styles.widthFull}`}>
                  <p className={`${Index.ClientName}`}>IAM To Do</p>
                  <p className={`${Index.ClientDescription}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi, atque.
                  </p>
                </div>
              </div>
            </li>
            {clientList ? (
              clientList.map((client: any, index: any) => (
                <li key={index}>{client.client_id}</li>
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
