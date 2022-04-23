import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

type Props = {};

export default function Token({}: Props) {
  return (
    <>
      <Head>
        <title>IAM To do - IAMBLOCKCHAIN</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>{JSON.stringify({ id: 5555 })}</div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryParams = context.query;
  console.log(queryParams);
  // if (queryParams.redirect_uri) {
  //   if (queryParams.redirect_uri != client.redirect_uri) {
  //     client.error_code = 400;
  //     client.error_description =
  //       "The redirect_uri must match the registered callback URL for this application";
  //     return { props: { error: client } };
  //   }
  // }
  return { props: {} };
};
