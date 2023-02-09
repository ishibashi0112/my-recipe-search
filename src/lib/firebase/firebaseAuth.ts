import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  UserCredential,
} from "firebase/auth";

import { auth } from "./client";

export const googleSignIn = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();

  await signInWithRedirect(auth, provider);
};

export const googleSignInRedirected =
  async (): Promise<UserCredential | null> => {
    return await getRedirectResult(auth);
  };

export const logout = async () => {
  await signOut(auth);
};

// export const signOut = async () => {
//   await fetch("/api/auth/sessionLogout", {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//   });
// };

// export const googleSignIn = async (): Promise<void> => {
//   const provider = new GoogleAuthProvider();
//   await setPersistence(auth, inMemoryPersistence);
//   await signInWithRedirect(auth, provider);
// };

// export const googleSignInRedirected = async (): Promise<
//   UserCredential | undefined
// > => {
//   const result = await getRedirectResult(auth);
//   if (!result) return;

//   const idToken = await result.user.getIdToken();
//   const cookies = parseCookies();
//   console.log(cookies);

//   await fetch("/api/auth/sessionLogin", {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify({ idToken }),
//   });

//   return result;
// };
