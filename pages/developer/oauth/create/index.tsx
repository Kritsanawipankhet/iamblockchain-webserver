import React from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import { useWeb3React } from "@web3-react/core";
import { useRouter, NextRouter } from "next/router";
import { LockIcon } from "@/components/icon";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";

type Props = {};

export default function OAuthCreate({}: Props) {
  const { active, chainId, deactivate, error } = useWeb3React();
  const route: NextRouter = useRouter();
  return (
    <DeveloperLayout>
      {active ? (
        <div>
          <div
            className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
          >
            <h1 className={Index.TitlePageMedium}>
              Register a new OAuth Application
            </h1>
          </div>
          <div className={Index.divider}></div>
          <div></div>
        </div>
      ) : (
        <div
          className={`${Styles.dFlex} ${Styles.flexColumn} ${Styles.flexItemsCenter} ${Styles.flexJustifyCenter} ${Styles.mxAuto} ${Styles.mt5} ${Styles.textCenter}`}
        >
          <LockIcon
            className={`${Styles.Octicon} ${Styles.colorFgMutes} ${Styles.mb2}`}
            width={32}
            height={32}
          />
          <div className={`${Index.permissionText}`}>
            You do not have permission to access OAuth Apps. <br></br>Please
            connect your wallet account.
          </div>
        </div>
      )}
    </DeveloperLayout>
  );
}
