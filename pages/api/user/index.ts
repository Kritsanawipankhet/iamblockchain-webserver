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
    id: "0x4DB0f8376E3A7e99f645ee23896F29FF8333AE02",
  });
}
