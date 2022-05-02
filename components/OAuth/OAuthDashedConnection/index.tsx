import { useEffect, useState } from "react";
import Index from "./index.module.css";
import Image from "next/image";
import Styles from "@/styles/styles.module.css";
import { EmphasisIcon, FacebookIcon, GithubIcon } from "@/components/icon/";
type Props = {
  applicationLogo: string;
  clientId: any;
};

export default function OAuthDashedConnection({
  applicationLogo = "",
  clientId,
}: Props) {
  return (
    <>
      {clientId === process.env.CLIENT_OP ? (
        <div
          className={`${Index.DashedConnectionOnly} ${Styles.mb0} ${Styles.mxAuto} ${Styles.dNone} ${Styles.dMdBlock}`}
          style={{ width: "300px" }}
        >
          <div
            className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexItemsCenter} ${Styles.py4}`}
          >
            <div
              className={`${Index.CircleBadge} ${Index.CircleBadgeMedium} ${Styles.colorBgWhite} ${Styles.overflowHidden}`}
            >
              {/* <GithubIcon
              className={`${Styles.Octicon} ${Styles.widthFull}  ${Styles.heightFull}`}
            /> */}
              <Image
                src="/iam.svg"
                alt="IAM"
                width={100}
                height={100}
                className={`${Index.Avatar} ${Index.AvatarUser} `}
              />
            </div>
          </div>
        </div>
      ) : (
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
              {applicationLogo ? (
                <Image
                  src={Buffer.from(applicationLogo, "base64").toString("ascii")}
                  width={100}
                  height={100}
                  alt="Application"
                  className={`${Index.Avatar} ${Index.AvatarUser} `}
                />
              ) : (
                <Image
                  src="/eth.png"
                  alt="Etheruem"
                  width={100}
                  height={100}
                  className={`${Index.Avatar} ${Index.AvatarUser} `}
                />
              )}
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
                src="/iam.svg"
                alt="IAM"
                width={100}
                height={100}
                className={`${Index.Avatar} ${Index.AvatarUser} `}
              />
            </div>
          </div>
        </div>
      )}
      {clientId === process.env.CLIENT_OP ? (
        <div
          className={`${Index.DashedConnectionOnly} ${Styles.mb0} ${Styles.mxAuto} ${Styles.dBlock} ${Styles.dMdNone}`}
          style={{ width: "200px" }}
        >
          <div
            className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexItemsCenter} ${Styles.py4}`}
          >
            <div
              className={`${Index.CircleBadge} ${Index.CircleBadgeSmall} ${Styles.colorBgWhite} ${Styles.overflowHidden}`}
            >
              {/* <GithubIcon
              className={`${Styles.Octicon} ${Styles.widthFull}  ${Styles.heightFull}`}
            /> */}
              <Image
                src="/iam.svg"
                alt="IAM"
                width={100}
                height={100}
                className={`${Index.Avatar} ${Index.AvatarUser} `}
              />
            </div>
          </div>
        </div>
      ) : (
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
              {applicationLogo ? (
                <Image
                  src={Buffer.from(applicationLogo, "base64").toString("ascii")}
                  width={100}
                  height={100}
                  alt="Application"
                  className={`${Index.Avatar} ${Index.AvatarUser} `}
                />
              ) : (
                <Image
                  src="/eth.png"
                  alt="Etheruem"
                  width={100}
                  height={100}
                  className={`${Index.Avatar} ${Index.AvatarUser} `}
                />
              )}
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
                src="/iam.svg"
                alt="IAM"
                width={100}
                height={100}
                className={`${Index.Avatar} ${Index.AvatarUser} `}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
