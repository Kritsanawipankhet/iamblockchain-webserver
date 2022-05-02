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
    id: "0x5d154b38e589C1Daa8A5D293fE878d5226830528",
  });
}
