import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  Space,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconToolsKitchen2 } from "@tabler/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import {
  googleSignIn,
  googleSignInRedirected,
} from "@/lib/firebase/firebaseAuth";

const SignIn: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      await googleSignIn();
      console.log("test");
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  }, []);

  useEffect(() => {
    const afterSignInProcess = async () => {
      setIsLoading(true);

      const result = await googleSignInRedirected();
      if (!result) {
        setIsLoading(false);
      }
    };
    afterSignInProcess();
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <Space h={144} />

      <Card className="mx-auto h-52 w-80" shadow="md" withBorder>
        <Group position="center" spacing={3}>
          <ThemeIcon color="yellow" radius="xl" size="xs">
            <IconToolsKitchen2 size={12} />
          </ThemeIcon>
          <Title ff="cursive" align="center" order={5}>
            today&rsquo;s recipe
          </Title>
        </Group>

        <Space h={10} />

        <Title ff="monospace" order={5} align="center">
          ログイン
        </Title>

        <Space h={30} />

        <Stack justify="center" align="center">
          <Button
            className="border border-gray-200 shadow-sm active:shadow-none"
            variant="outline"
            color="dark"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            <FcGoogle />
            <Space w={10} />
            <Text>Googleアカウントでログイン</Text>
          </Button>
        </Stack>

        <Space h={8} />

        <Stack align="center">
          <Text ml={5} color="dark" fz="xs">
            ※Google認証でのみログインできます。
            <br />
            ※特定のアカウントのみがログインできます。
          </Text>
        </Stack>
      </Card>
      <LoadingOverlay
        loaderProps={{ size: "sm", color: "yellow" }}
        visible={isLoading}
      />
      <small className="absolute bottom-2 grid w-full place-content-center ">
        ©︎copylight 2023 yuki_ishibashi
      </small>
    </div>
  );
};

export default SignIn;
