import {
  Group,
  Header as MantineHeader,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconToolsKitchen2 } from "@tabler/icons";
import React, { FC } from "react";

export const Header: FC = () => {
  return (
    <MantineHeader className="flex items-center px-2" height={50}>
      <Group spacing={4}>
        <ThemeIcon color="yellow" radius="xl">
          <IconToolsKitchen2 size={16} />
        </ThemeIcon>
        <Title ff="cursive" align="center" order={3}>
          today&rsquo;s recipe
        </Title>
      </Group>

      <Group></Group>
    </MantineHeader>
  );
};
