import React, { useState } from "react";
import Index from "./index.module.css";
import Styles from "@/styles/styles.module.css";
import { GlobeIcon, QuestionIcon } from "@/components/icon/";
import Link from "next/link";

type Props = {
  type: string;
};

let title = "Public data only";
let description = "Limited access ty your public data";
let subDescription =
  "This application will be able to identify you and read public information.";

export default function OAuthPermission({ type }: Props) {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(!show);
  }
  return (
    <div
      className={`${Styles.px0} ${Styles.borderBottom0} ${Index.oauthPermissionsDetails} ${Index.oauthPublicDataOnly}`}
    >
      <div
        className={`${Index.permissionSummary} ${Styles.dFlex} ${Styles.flexGap3}`}
      >
        <GlobeIcon
          height={32}
          width={32}
          className={`${Styles.Octicon} ${Styles.colorFgMutes}`}
        ></GlobeIcon>
        <div>
          <strong className={Index.permissionTitle}>{title}</strong>
          <small className={Index.accessDetails}>
            {description}
            <span
              className={`${Index.hiddenTextExpander} ${Styles.ml1} ${Styles.dInline}`}
            >
              <button className={Index.ellipsisExpander} onClick={handleClick}>
                ...
              </button>
            </span>
          </small>
          <div className={show ? Styles.dBlock : Styles.dNone}>
            <div className={Index.permissionHelp}>
              <p className={Styles.mb10p}>{subDescription}</p>
              <Link href="#">
                <a>
                  <QuestionIcon
                    className={`${Styles.Octicon} ${Styles.mr1} ${Styles.colorFgMutes}`}
                  ></QuestionIcon>
                  Learn more
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
