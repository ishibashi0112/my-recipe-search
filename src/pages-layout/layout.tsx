import { AppShell } from "@mantine/core";
import React, { FC, ReactNode } from "react";

import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <AppShell
      classNames={{ body: "bg-gray-50" }}
      header={<Header />}
      fixed={false}
    >
      {children}
    </AppShell>
  );
};
