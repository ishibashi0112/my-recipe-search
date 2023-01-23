import { Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import Link from "next/link";
import React from "react";

export const SearchLinkButton = () => {
  return (
    <Button
      className="absolute bottom-24  right-5 active:bg-yellow-400"
      color="yellow"
      radius="xl"
      size="md"
      leftIcon={<IconSearch size={18} />}
      component={Link}
      href="/"
    >
      検索
    </Button>
  );
};
