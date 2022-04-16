import React from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";

type Props = {};

export default function Client({}: Props) {
  return (
    <DeveloperLayout>
      <div
        className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
      >
        <h1 className={Index.TitlePage}>OAuth Apps</h1>
      </div>
      <div className={Index.divider}></div>
    </DeveloperLayout>
  );
}
