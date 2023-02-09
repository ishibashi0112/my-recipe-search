import { Footer as MantineFooter, NavLink } from "@mantine/core";
import { IconHome } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { FC } from "react";

export const Footer: FC = () => {
  const { pathname } = useRouter();
  return (
    <MantineFooter height={50}>
      <div className="flex h-full">
        <NavLink
          className=""
          active={pathname === "/"}
          icon={<IconHome size={22} />}
          label="Home"
          color="yellow"
          variant="subtle"
        />
        <NavLink
          active={false}
          icon={<IconHome />}
          label="登録一覧"
          color="yellow"
          variant="subtle"
        />
        <NavLink
          active={false}
          icon={<IconHome />}
          label="Home"
          color="yellow"
          variant="subtle"
        />
      </div>
    </MantineFooter>
  );
};
