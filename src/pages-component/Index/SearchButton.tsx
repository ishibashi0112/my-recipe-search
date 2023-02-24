import { ActionIcon, CloseButton, Drawer, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { FC, useCallback, useState } from "react";

import { IngredientsName, RecipesWithIngredients } from "@/type/types";

import { useSwipeClose } from "./hook/useSwipeClose";
import { SearchForm } from "./SearchForm";

type Props = {
  initialRecipes: RecipesWithIngredients[];
  ingredientsNames: IngredientsName[];
};

export const SearchButton: FC<Props> = (props) => {
  const [opened, setOpened] = useState(false);
  const { isCloseable, setSwaipeYState, TouchBarComponent } = useSwipeClose({
    onClose: () => setOpened(false),
  });

  const handleOpen = useCallback(() => {
    setSwaipeYState((prev) => (prev.move > 0 ? { start: 0, move: 0 } : prev));
    setOpened(true);
  }, []);

  return (
    <>
      <ActionIcon
        className="fixed bottom-12 right-5 active:bg-yellow-400"
        color="yellow"
        radius="xl"
        size={60}
        variant="light"
        onClick={() => handleOpen()}
      >
        <IconSearch size={30} />
      </ActionIcon>

      <Drawer
        classNames={{
          title: " font-semibold font-mono",
          root: `${isCloseable ? "opacity-80" : null}`,
          drawer: `rounded-t-2xl pt-5 bg-white`,
          closeButton: "z-50 ",
        }}
        title={
          <Text ff="revert" align="center" fz="lg" fw="bold">
            レシピ検索
          </Text>
        }
        size="75%"
        padding="sm"
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        overlayOpacity={0.3}
        withCloseButton={false}
      >
        {TouchBarComponent}

        <SearchForm setOpened={setOpened} {...props} />

        <CloseButton
          className="absolute top-3 right-1"
          size="xl"
          color="dark"
          variant={isCloseable ? "light" : "subtle"}
          onClick={() => setOpened(false)}
        />
      </Drawer>
    </>
  );
};
