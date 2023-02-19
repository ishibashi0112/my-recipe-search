import { AppShell } from "@mantine/core";
import React, { FC, ReactNode } from "react";

import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <AppShell header={<Header />} fixed={false}>
      {children}
    </AppShell>
  );
};
