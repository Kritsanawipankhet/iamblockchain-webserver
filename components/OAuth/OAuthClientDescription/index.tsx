import React from "react";
import Styles from "@/styles/styles.module.css";
import Index from "./index.module.css";
import {
  CircleSlashIcon,
  ClockIcon,
  OrganizationIcon,
} from "@/components/icon/";

import moment from "moment";

type Props = {
  clientName?: string;
  createDate?: number;
  usersCount?: number;
  usersCountString?: string;
};

export default function OAuthClientDescription({
  clientName,
  createDate = 0,
  usersCount,
  usersCountString = "Fewer than 10 ",
}: Props) {
  return (
    <div
      className={`${Index.Box} ${Styles.colorBgSubtle} ${Styles.px4} ${Styles.py3} ${Styles.mt3} ${Styles.textSmall} ${Styles.colorFgMutes} ${Styles.clearfix} ${Styles.dFlex} ${Styles.flexGap3} ${Styles.flexJustifyBetween}`}
    >
      <div className={`${Styles.dFlex} ${Styles.flexGap2}`}>
        <CircleSlashIcon className={`${Styles.Octicon}`}></CircleSlashIcon>
        <div>
          <strong>Not </strong>
          <span>owned or operated by IAM</span>
        </div>
      </div>
      <div className={`${Styles.dFlex} ${Styles.flexGap2}`}>
        <ClockIcon className={`${Styles.Octicon}`}></ClockIcon>
        <div>
          <strong>Created </strong>
          <span className={Styles.dInlineBlock}>
            {moment(new Date(createDate * 1000)).fromNow()}
          </span>
        </div>
      </div>
      <div className={`${Styles.dFlex} ${Styles.flexGap2}`}>
        <OrganizationIcon className={`${Styles.Octicon}`}></OrganizationIcon>
        <div>
          <strong>{usersCountString}</strong>
          <span>{clientName} users</span>
        </div>
      </div>
    </div>
  );
}
