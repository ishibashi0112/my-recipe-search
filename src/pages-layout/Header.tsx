import {
  Anchor,
  Button,
  Group,
  Header as MantineHeader,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconToolsKitchen2 } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

import { signOut } from "@/lib/firebase/firebaseAuth";

export const Header: FC = () => {
  const { push } = useRouter();

  const handleLogout = async () => {
    await signOut();
    push("/login");
  };

  return (
    <MantineHeader
      className="flex items-center justify-between px-2"
      height={50}
    >
      <Anchor
        className="hover:underline"
        variant="text"
        component={Link}
        href={"/"}
      >
        <Group spacing={4}>
          <ThemeIcon color="yellow" radius="xl">
            <IconToolsKitchen2 size={16} />
          </ThemeIcon>
          <Title ff="cursive" align="center" order={3}>
            today&rsquo;s recipe
          </Title>
        </Group>
      </Anchor>

      <Group position="right">
        <Button color="red" size="xs" compact onClick={() => handleLogout()}>
          ログアウト
        </Button>
      </Group>
    </MantineHeader>
  );
};
