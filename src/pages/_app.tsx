import "@/styles/globals.css";

import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

import { AuthProvider } from "@/pages-component/login/AuthProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>my-recipe-search</title>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MantineProvider>
    </>
  );
};

export default App;
