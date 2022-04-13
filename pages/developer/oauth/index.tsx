import React, { useEffect, useState } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import { LayerIcon, LockIcon } from "@/components/icon";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import { PermissionDenied, NoApplication } from "@/components/Developer/";
type Props = {};

export default function Developer({}: Props) {
  const { active, account } = useWeb3React();

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
        <NoApplication></NoApplication>
      </DeveloperLayout>
    );
  }
  return (
    <DeveloperLayout>
      <PermissionDenied></PermissionDenied>
    </DeveloperLayout>
  );
}
