import React, { useState } from "react";
import Index from "./index.module.css";
import Styles from "@/styles/styles.module.css";
import { LinkIcon } from "@/components/icon/";
import Link from "next/link";

type Props = {};

export default function OAuthChain({}: Props) {
  return (
    <div
      className={`${Styles.px0} ${Styles.borderBottom0} ${Index.oauthPermissionsDetails} ${Index.oauthPublicDataOnly}`}
    >
      <div
        className={`${Index.permissionSummary} ${Styles.dFlex} ${Styles.flexGap3}`}
      >
        <LinkIcon
          className={`${Styles.Octicon} ${Styles.colorFgMutes}`}
          width={32}
          height={32}
        />
        <div>
          <strong className={Index.permissionTitle}>
            Supported Blockchain networks
          </strong>
          <small className={Index.accessDetails}>
            ChainId 4 : Rinkeby Test Network.
          </small>
        </div>
      </div>
    </div>
  );
}
