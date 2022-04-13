import React from "react";
import Styles from "@/styles/styles.module.css";
import Index from "./index.module.css";

import { LockIcon } from "@/components/icon";
type Props = {};

export default function PermissionDenied({}: Props) {
  return (
    <div
      className={`${Styles.dFlex} ${Styles.flexColumn} ${Styles.flexItemsCenter} ${Styles.flexJustifyCenter} ${Styles.mxAuto} ${Styles.mt5} ${Styles.textCenter}`}
    >
      <LockIcon
        className={`${Styles.Octicon} ${Styles.colorFgMutes} ${Styles.mb2}`}
        width={32}
        height={32}
      />
      <div className={`${Index.permissionText}`}>
        You do not have permission to access OAuth Apps. <br></br>Please connect
        your wallet account.
      </div>
    </div>
  );
}
