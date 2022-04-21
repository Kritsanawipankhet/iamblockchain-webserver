import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  access_token: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);
  res.status(200).json({
    access_token: "ACCESS_TOKEN",
    token_type: "bearer",
    expires_in: 2592000,
    refresh_token: "REFRESH_TOKEN",
    scope: "read",
    uid: 100101,
    info: { name: "Mark E. Mark", email: "mark@thefunkybunch.com" },
  });
}
