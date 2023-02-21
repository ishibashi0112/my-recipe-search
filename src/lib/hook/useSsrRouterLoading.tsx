import { Alert, Group, Loader, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const useSsrRouterLoading = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  const loadingComponent = (
    <Alert
      className="fixed top-3 left-1/2"
      style={{ transform: "translateX(-50%)" }}
      color="yellow"
    >
      <Group position="center">
        <Loader color="orange" size="sm" />
      </Group>

      <Text mt={5} color="orange" align="center">
        loading...
      </Text>
    </Alert>
  );
  return { pageLoading, loadingComponent };
};
