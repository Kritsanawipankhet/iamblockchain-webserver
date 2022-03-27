import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ethersGetClientById } from "../../ethereum";
import { TClient, TClientError, TAuthorize } from "../../models";

type Props = {
  data: TClient | TClientError;
};

let Client: TClient | TClientError;

export default function Authorize({ data }: Props) {
  return <div>{JSON.stringify(data)}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryParams = context.query as TAuthorize;

  if (queryParams.client_id) {
    Client = await ethersGetClientById(queryParams.client_id);
  }
  return { props: { data: Client } };
};
