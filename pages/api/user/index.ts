// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("user", req);
  res.status(200).json({
    id: "0x2f4E90CBF5A697ff6420c8928B6Fb23aF89419Ee",
  });
}
