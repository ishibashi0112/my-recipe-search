import {
  getRedirectResult,
  GoogleAuthProvider,
  inMemoryPersistence,
  setPersistence,
  signInWithRedirect,
  UserCredential,
} from "firebase/auth";

import { auth } from "./client";

export const googleSignIn = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  await setPersistence(auth, inMemoryPersistence);
  await signInWithRedirect(auth, provider);
};

export const googleSignInRedirected = async (): Promise<
  UserCredential | undefined
> => {
  const result = await getRedirectResult(auth);
  if (!result) return;

  const idToken = await result.user.getIdToken();
  await fetch("/api/auth/sessionLogin", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  return result;
};

export const signOut = async () => {
  await fetch("/api/auth/sessionLogout", {
    method: "POST",
    headers: { "Content-type": "application/json" },
  });
};
