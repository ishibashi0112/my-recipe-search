import type { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

import { adminAuth } from "@/lib/firebase/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = req.cookies.session || "";
  destroyCookie({ res }, "session", { path: "/" });

  try {
    const idToken = await adminAuth.verifySessionCookie(sessionCookie);
    await adminAuth.revokeRefreshTokens(idToken.sub);
  } catch (error) {
    console.log(error);

    res.status(401).end();
  }

  res.status(200).end();
};
export default handler;
