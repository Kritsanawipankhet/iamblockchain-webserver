// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);
  res.status(200).json({
    access_token: "ACCESS_TOKEN",
    token_type: "bearer",
    expires_in: 2592000,
    refresh_token: "REFRESH_TOKEN",
    scope: "user",
    uid: 100101,
    info: { name: "Mark E. Mark", email: "mark@thefunkybunch.com" },
  });
}
