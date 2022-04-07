import React from "react";
import Error from "next/error";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { ethersGetClientById } from "../../ethereum";
import { TClient, TAuthorize } from "../../models";
import { AuthLayout } from "@/components/layouts/auth";
import Styles from "@/styles/styles.module.css";
import Index from "@/styles/auth.module.css";
import DashedConnection from "@/components/DashedConnection";
import OAuthPermission from "@/components/OAuthPermission";
import Link from "next/link";
import {
  CircleSlashIcon,
  ClockIcon,
  OrganizationIcon,
} from "@/components/icon/";

type Props = {
  data: TClient;
  errorCode?: number;
};

export default function Authorize({ data, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  console.log(data);
  return (
    <AuthLayout>
      <div className={Styles.mxAuto} style={{ maxWidth: "530px" }}>
        <div className={`${Styles.px3} ${Styles.pt4}`}>
          <DashedConnection />
          <h2
            className={`${Styles.m0} ${Styles.f2} ${Styles.textNormal} ${Styles.textCenter} ${Styles.lhCondensed}  ${Styles.mb4}`}
          >
            Authorize {data.client_name}
          </h2>
        </div>
        <div className={`${Styles.px3} ${Styles.mt5}`}>
          <div className={`${Index.Box} ${Styles.colorShadowSmall}`}>
            <div className={`${Index.BoxBody} ${Styles.p3} ${Styles.pMd4}`}>
              <div
                className={`${Styles.mb2} ${Styles.lhDefault} ${Styles.dFlex} ${Styles.flexContentCenter} ${Styles.flexItemsCenter} ${Styles.flexGap3}`}
              >
                <div className={`${Styles.mt1}`}>
                  <Image
                    src="https://avatars.githubusercontent.com/u/34856790?s=64&v=4"
                    alt="@Kritsanawipankhet"
                    width={32}
                    height={32}
                    className={`${Index.Avatar} ${Index.AvatarUser} `}
                  />
                </div>
                <div>
                  <strong>{data.client_name}</strong>
                  {" by "}
                  <strong>
                    <Link href="#">
                      <a>{"0x2f4...19E3"}</a>
                    </Link>
                  </strong>
                  <small className={`${Styles.dBlock} ${Styles.colorFgMutes}`}>
                    wants to access your <strong>{"0x2f4...19E3"}</strong>{" "}
                    account
                  </small>
                </div>
              </div>
              <div>
                <OAuthPermission type=""></OAuthPermission>
              </div>
            </div>
            <div
              className={`${Index.BoxFooter} ${Styles.p3} ${Styles.pMd4} ${Styles.clearfix}`}
            >
              <form>
                <div
                  className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
                >
                  <button
                    className={`${Index.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal}`}
                  >
                    Cancel
                  </button>
                  <button
                    className={` ${Index.btn} ${Styles.btn} ${Index.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal}`}
                  >
                    Authorize <p>Kritsanawipankhet</p>
                  </button>
                </div>
              </form>
              <div className={Styles.mt2}>
                <p
                  className={`${Styles.textCenter} ${Styles.textSmall} ${Styles.colorFgMutes} ${Styles.mb0}`}
                >
                  Authorizing will redirect to <br></br>
                  <strong className={Styles.colorFgDefault}>
                    {data.redirect_uri}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${Index.Box} ${Styles.colorBgSubtle} ${Styles.px4} ${Styles.py3} ${Styles.mt3} ${Styles.textSmall} ${Styles.colorFgMutes} ${Styles.clearfix} ${Styles.dFlex} ${Styles.flexGap3} ${Styles.flexJustifyBetween}`}
          >
            <div className={`${Styles.dFlex} ${Styles.flexGap2}`}>
              <CircleSlashIcon
                className={`${Styles.Octicon}`}
              ></CircleSlashIcon>
              <div>
                <strong>Not </strong>
                <span>owned or operated by IAM</span>
              </div>
            </div>
            <div className={`${Styles.dFlex} ${Styles.flexGap2}`}>
              <ClockIcon className={`${Styles.Octicon}`}></ClockIcon>
              <div>
                <strong>Created </strong>
                <span className={Styles.dInlineBlock}>7 months ago</span>
              </div>
            </div>
            <div className={`${Styles.dFlex} ${Styles.flexGap2}`}>
              <OrganizationIcon
                className={`${Styles.Octicon}`}
              ></OrganizationIcon>
              <div>
                <strong>Fewer than 10 </strong>
                <span>IAM users</span>
              </div>
            </div>
          </div>
          <div className={`${Styles.textCenter} ${Styles.my3}`}>
            <Link href="#">
              <a className={`${Styles.textSmall} ${Styles.linkMuted}`}>
                Learn more about OAuth
              </a>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryParams = context.query as TAuthorize;
  const client = await ethersGetClientById(queryParams.client_id);
  if (client.error) {
    return {
      props: { errorCode: client.error_code },
    };
  }

  return { props: { data: client } };
};
