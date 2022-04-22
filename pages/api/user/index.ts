// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import Cors from "cors";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await cors(req, res);
  console.log("user", req);
  const authorize_code: any = req.headers.authorization;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Authorization", authorize_code);
  res.status(200).json({ id: 159715971597 });
}

// function initMiddleware(middleware: any) {
//   return (req: any, res: any) =>
//     new Promise((resolve, reject) => {
//       middleware(req, res, (result: any) => {
//         if (result instanceof Error) {
//           return reject(result);
//         }
//         return resolve(result);
//       });
//     });
// }
