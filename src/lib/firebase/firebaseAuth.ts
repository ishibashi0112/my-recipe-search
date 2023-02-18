import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "./client";

export const passwordLogin = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  await signOut(auth);
};
