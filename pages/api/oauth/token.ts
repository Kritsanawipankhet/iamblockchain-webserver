// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { makeClientSecret } from "@/libs/string";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);

  res.status(200).json({
    access_token: makeClientSecret(64),
    token_type: "bearer",
    expires_in: 30 * 24 * 60 * 60,
    scope: "user",
  });
}
