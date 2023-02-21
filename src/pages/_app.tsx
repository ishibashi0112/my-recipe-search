import "@/styles/globals.css";

import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

import { useSsrRouterLoading } from "@/lib/hook/useSsrRouterLoading";
import { AuthProvider } from "@/pages-component/login/AuthProvider";

const App = ({ Component, pageProps }: AppProps) => {
  const { pageLoading, loadingComponent } = useSsrRouterLoading();
  return (
    <>
      <Head>
        <title>my-recipe-search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          {pageLoading && loadingComponent}
        </AuthProvider>
      </MantineProvider>
    </>
  );
};

export default App;
