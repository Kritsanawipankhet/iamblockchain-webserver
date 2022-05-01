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
    id: "0x6cc9494425c48E384F615164964a457C810e7826",
  });
}
