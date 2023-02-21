import {
  Anchor,
  Avatar,
  Button,
  Group,
  Header as MantineHeader,
  Menu,
  ThemeIcon,
} from "@mantine/core";
import { IconLogout, IconToolsKitchen2 } from "@tabler/icons";
import React, { FC } from "react";

import { logout } from "@/lib/firebase/firebaseAuth";

export const Header: FC = () => {
  return (
    <MantineHeader
      className="flex items-center justify-between px-2"
      height={50}
    >
      <Group spacing={4}>
        <ThemeIcon color="yellow" radius="xl">
          <IconToolsKitchen2 size={16} />
        </ThemeIcon>
        <Anchor
          href="/"
          ff="revert"
          align="center"
          fz="xl"
          color="orange"
          fw="bold"
        >
          Today&rsquo;s Recipe
        </Anchor>
      </Group>

      <Group position="right">
        <Menu>
          <Menu.Target>
            <Avatar radius="xl" color="yellow" />
          </Menu.Target>
          <Menu.Dropdown>
            <Button
              variant="subtle"
              color="red"
              size="xs"
              compact
              leftIcon={<IconLogout size={16} />}
              onClick={() => logout()}
            >
              ログアウト
            </Button>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </MantineHeader>
  );
};
