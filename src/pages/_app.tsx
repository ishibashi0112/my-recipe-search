import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </ClerkProvider>
  );
};

export default App;
