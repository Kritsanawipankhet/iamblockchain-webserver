import { useEffect, useState } from "react";
import Index from "./index.module.css";
import Image from "next/image";
import Styles from "@/styles/styles.module.css";
import { EmphasisIcon, FacebookIcon, GithubIcon } from "@/components/icon/";
import { toSvg } from "jdenticon";
type Props = {};

export default function OAuthDashedConnection({}: Props) {
  const [color, setColor] = useState("#000");
  useEffect(() => setColor(setBg()), []);

  const svgString = encodeURIComponent(
    toSvg("5adasdaasdsss22asdasasdasd", 100, {
      lightness: {
        color: [1.0, 1.0],
        grayscale: [1.0, 1.0],
      },
      saturation: {
        color: 1.0,
        grayscale: 0.0,
      },
      backColor: color,
    })
  );
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
              src={Buffer.from(
                "ZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhkcFpIUm9QU0l4TURBaUlHaGxhV2RvZEQwaU1UQXdJaUIyYVdWM1FtOTRQU0l3SURBZ01UQXdJREV3TUNJK1BISmxZM1FnZDJsa2RHZzlJakV3TUNVaUlHaGxhV2RvZEQwaU1UQXdKU0lnWm1sc2JEMGlJekF3TURBd01DSWdiM0JoWTJsMGVUMGlNUzR3TUNJdlBqeHdZWFJvSUdacGJHdzlJaU5tWm1abVptWWlJR1E5SWsweU9TQXhPQzQxVERNNUxqVWdPRXcxTUNBeE9DNDFURE01TGpVZ01qbGFUVFl3TGpVZ09FdzNNU0F4T0M0MVREWXdMalVnTWpsTU5UQWdNVGd1TlZwTk56RWdPREV1TlV3Mk1DNDFJRGt5VERVd0lEZ3hMalZNTmpBdU5TQTNNVnBOTXprdU5TQTVNa3d5T1NBNE1TNDFURE01TGpVZ056Rk1OVEFnT0RFdU5WcE5PQ0F6T1M0MVRERTRMalVnTWpsTU1qa2dNemt1TlV3eE9DNDFJRFV3V2swNE1TNDFJREk1VERreUlETTVMalZNT0RFdU5TQTFNRXczTVNBek9TNDFXazA1TWlBMk1DNDFURGd4TGpVZ056Rk1OekVnTmpBdU5VdzRNUzQxSURVd1drMHhPQzQxSURjeFREZ2dOakF1TlV3eE9DNDFJRFV3VERJNUlEWXdMalZhVFRnZ01UZ3VOVXd4T0M0MUlEaE1NamtnTVRndU5Vd3hPQzQxSURJNVdrMDRNUzQxSURoTU9USWdNVGd1TlV3NE1TNDFJREk1VERjeElERTRMalZhVFRreUlEZ3hMalZNT0RFdU5TQTVNa3czTVNBNE1TNDFURGd4TGpVZ056RmFUVEU0TGpVZ09USk1PQ0E0TVM0MVRERTRMalVnTnpGTU1qa2dPREV1TlZwTk1qa2dNamxNTlRBZ01qbE1OVEFnTXpJdU5FdzBNUzR5SURVd1RESTVJRFV3V2swM01TQXlPVXczTVNBMU1FdzJOeTQySURVd1REVXdJRFF4TGpKTU5UQWdNamxhVFRjeElEY3hURFV3SURjeFREVXdJRFkzTGpaTU5UZ3VPQ0ExTUV3M01TQTFNRnBOTWprZ056Rk1NamtnTlRCTU16SXVOQ0ExTUV3MU1DQTFPQzQ0VERVd0lEY3hXaUl2UGp3dmMzWm5QZz09",
                "base64"
              ).toString("ascii")}
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
              src="/iam.svg"
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
            <Image
              src={`data:image/svg+xml;utf8,${svgString}`}
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
    </>
  );
}

const setBg = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};
