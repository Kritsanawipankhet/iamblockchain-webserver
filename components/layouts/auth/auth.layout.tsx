import React from "react";
import Styles from "./auth.layout.module.css";
import Head from "next/head";
type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Authorize application - IAMBLOCKCHAIN</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={Styles.body}>{children}</div>
    </>
  );
}
