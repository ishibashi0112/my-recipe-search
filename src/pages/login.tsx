import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconToolsKitchen2 } from "@tabler/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { z } from "zod";

import { passwordLogin } from "@/lib/firebase/firebaseAuth";

const schema = z.object({
  email: z.string().min(1).email("誤ったemail形式です。"),
  password: z.string().min(6, "passwordは6桁以上です。"),
});

const SignIn: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { push } = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      await passwordLogin(values.email, values.password);
      push("/");
    } catch (error) {
      setLoginError("emailもしくはパスワードが異なります。");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loginError) {
      setLoginError("");
    }
  }, [form.values]);

  return (
    <div className="h-screen bg-gray-100">
      <Space h={120} />

      <Card className="mx-auto h-96  w-80" shadow="md">
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

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              classNames={{ input: "text-base" }}
              label="email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              classNames={{ input: "text-base" }}
              label="password"
              {...form.getInputProps("password")}
            />

            <Text fz="xs" color="red" align="center">
              {loginError}
            </Text>

            <Button className="mt-4 w-full" type="submit" color="yellow">
              ログイン
            </Button>
          </Stack>
        </form>
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
