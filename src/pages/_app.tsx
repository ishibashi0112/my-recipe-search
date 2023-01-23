import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default App;
