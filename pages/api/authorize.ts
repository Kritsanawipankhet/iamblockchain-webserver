// import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
// import { useRouter } from "next/router";
// import { GetServerSideProps } from "next";
import { ethersGetClientById } from "../../ethereum";
import { TClient, TClientError, TAuthorize } from "../../models";

let Client: TClient | TClientError;

export default async function Authorize(
  req: NextApiRequest,
  res: NextApiResponse<TClient | TClientError>
) {
  console.log(req);
  const queryParams = req.query as TAuthorize;

  if (queryParams.client_id) {
    Client = await ethersGetClientById(queryParams.client_id);
  }
  res.status(200).json(Client);
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const queryParams = context.query as TAuthorize;

//   if (queryParams.client_id) {
//     Client = await ethersGetClientById(queryParams.client_id);
//   }
//   return { props: { data: Client } };
// };
