import React from "react";
import Styles from "@/styles/styles.module.css";
import { urlDomainFormat } from "@/libs/string";
type Props = {
  redirectUri: string;
};

export default function OAuthRedirect({ redirectUri }: Props) {
  return (
    <div className={Styles.mt2}>
      <p
        className={`${Styles.textCenter} ${Styles.textSmall} ${Styles.colorFgMutes} ${Styles.mb0}`}
      >
        Authorizing will redirect to <br></br>
        <strong className={Styles.colorFgDefault}>
          {urlDomainFormat(redirectUri)}
        </strong>
      </p>
    </div>
  );
}
