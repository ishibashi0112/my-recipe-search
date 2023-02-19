import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect } from "react";

import { auth } from "@/lib/firebase/client";

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const { pathname, replace, push } = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/login") push("/");
      } else {
        replace("/login");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <>{children}</>;
};
