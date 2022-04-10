import React from "react";
import Index from "./index.module.css";
import Image from "next/image";
import Styles from "@/styles/styles.module.css";
import { EmphasisIcon, FacebookIcon, GithubIcon } from "@/components/icon/";
import { toSvg } from "jdenticon";
type Props = {};

export default function OAuthDashedConnection({}: Props) {
  const svgString = toSvg("value", 100);
  const image =
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="47.4" height="40.65" viewBox="21 18.5 158 135.5"><path d="M25,50 l150,0 0,100 -150,0 z" stroke-width="4" stroke="black" fill="rgb(128,224,255)" fill-opacity="1" ></path><path d="M25,50 L175,150 M25,150 L175,50" stroke-width="4" stroke="black" fill="black" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><circle cx="100" cy="30" r="7.5" fill="black" ></circle><circle cx="70" cy="30" r="7.5" fill="black" ></circle><circle cx="130" cy="30" r="7.5" fill="black" ></circle></g></svg>';
  return (
    <>
      <div
        className={`${Index.DashedConnection} ${Styles.mb0} ${Styles.mxAuto} ${Styles.dNone} ${Styles.dMdBlock}`}
        style={{ width: "300px" }}
      >
        <div
          className={`${Styles.dFlex} ${Styles.flexJustifyBetween} ${Styles.flexItemsCenter} ${Styles.py4}`}
        >
          <div
            className={`${Index.CircleBadge} ${Index.CircleBadgeMedium} ${Styles.colorBgWhite} ${Styles.overflowHidden}`}
          >
            {/* <FacebookIcon
              className={`${Styles.Octicon} ${Styles.widthFull}  ${Styles.heightFull}`}
            /> */}
            <Image
              src="/eth-icon.png"
              alt="Eth"
              width={100}
              height={100}
              className={`${Index.Avatar} ${Index.AvatarUser} `}
            />
          </div>
          <div
            className={`${Index.CircleEmphasis} ${Styles.positionRelative} ${Styles.colorBgPrimary} ${Styles.textCenter}`}
          >
            <EmphasisIcon
              className={`${Styles.Octicon} ${Styles.colorFgOnEmphasis} ${Styles.mt2}`}
            />
          </div>
          <div
            className={`${Index.CircleBadge} ${Index.CircleBadgeMedium} ${Styles.colorBgWhite} ${Styles.overflowHidden}`}
          >
            {/* <GithubIcon
              className={`${Styles.Octicon} ${Styles.widthFull}  ${Styles.heightFull}`}
            /> */}
            <Image
              src="/iam.png"
              alt="IAM"
              width={100}
              height={100}
              className={`${Index.Avatar} ${Index.AvatarUser} `}
            />
          </div>
        </div>
      </div>
      <div
        className={`${Index.DashedConnection} ${Styles.mb0} ${Styles.mxAuto} ${Styles.dBlock} ${Styles.dMdNone}`}
        style={{ width: "200px" }}
      >
        <div
          className={`${Styles.dFlex} ${Styles.flexJustifyBetween} ${Styles.flexItemsCenter} ${Styles.py4}`}
        >
          <div
            className={`${Index.CircleBadge} ${Index.CircleBadgeSmall} ${Styles.colorBgWhite} ${Styles.overflowHidden}`}
          >
            <FacebookIcon
              className={`${Styles.Octicon} ${Styles.widthFull}  ${Styles.heightFull}`}
            />
          </div>
          <div
            className={`${Index.CircleEmphasis} ${Styles.positionRelative} ${Styles.colorBgPrimary} ${Styles.textCenter}`}
          >
            <EmphasisIcon
              className={`${Styles.Octicon} ${Styles.colorFgOnEmphasis} ${Styles.mt2}`}
            />
          </div>
          <div
            className={`${Index.CircleBadge} ${Index.CircleBadgeSmall} ${Styles.colorBgWhite} ${Styles.overflowHidden}`}
          >
            {/* <GithubIcon
              className={`${Styles.Octicon} ${Styles.widthFull}  ${Styles.heightFull}`}
            /> */}
            <Image
              src="/iam.png"
              alt="IAM"
              width={100}
              height={100}
              className={`${Index.Avatar} ${Index.AvatarUser} `}
            />
          </div>
        </div>
      </div>
    </>
  );
}
