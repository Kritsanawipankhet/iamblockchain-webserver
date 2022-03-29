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

type Props = {
  data: TClient;
  errorCode?: number;
};

export default function Authorize({ data, errorCode }: Props) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  return (
    <AuthLayout>
      <div className={Styles.mxAuto} style={{ maxWidth: "530px" }}>
        <div className={`${Styles.px3} ${Styles.pt4}`}>
          <DashedConnection />
          <h2
            className={`${Styles.f2} ${Styles.textNormal} ${Styles.textCenter} ${Styles.lhCondensed}  ${Styles.mb4}`}
          >
            Authorize {`Facebook`}
          </h2>
        </div>
        <div className={`${Styles.px3} ${Styles.mt5}`}>
          <div className={`${Index.Box} ${Styles.colorShadowSmall}`}>
            <div className={`${Index.BoxBody} ${Styles.p3} ${Styles.pMd4}`}>
              <div
                className={`${Styles.mb2} ${Styles.lhDefault} ${Styles.dFlex} ${Styles.flexContentCenter} ${Styles.flexItemsCenter} ${Styles.flexGap2}`}
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
                  <strong>Facebook</strong>
                  {" by "}
                  <strong>
                    <a>Meta</a>
                  </strong>
                  <small className={Styles.dBlock}>
                    wants to access your <strong>Kritsanawipankhet</strong>{" "}
                    account
                  </small>
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
                fugiat repellat ullam natus ea. Nesciunt placeat iusto quibusdam
                fugiat corrupti?
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
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
