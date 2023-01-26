import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

import { adminAuth } from "@/lib/firebase/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const idToken = req.body.idToken as string;

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    // Set cookie policy for session cookie.
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: "/",
    };

    setCookie({ res }, "session", sessionCookie, options);
    res.end(JSON.stringify({ status: "success" }));
  } catch (error) {
    res.status(401).send("UNAUTHORIZED REQUEST!");
  }
};
export default handler;
