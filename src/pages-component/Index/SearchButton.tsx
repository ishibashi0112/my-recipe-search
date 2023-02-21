import { Button, Drawer } from "@mantine/core";
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
  const { swaipeYState, setSwaipeYState, TouchBarComponent } = useSwipeClose({
    onClose: () => setOpened(false),
  });

  const handleOpen = useCallback(() => {
    setSwaipeYState((prev) => (prev.move > 0 ? { start: 0, move: 0 } : prev));
    setOpened(true);
  }, []);

  return (
    <>
      <Button
        className="fixed bottom-12 right-5 active:bg-yellow-400"
        color="yellow"
        radius="xl"
        size="md"
        leftIcon={<IconSearch size={16} />}
        onClick={() => handleOpen()}
      >
        検索
      </Button>

      <Drawer
        classNames={{
          title: " font-semibold  font-serif",
          drawer: "rounded-t-2xl pt-5",
          closeButton: "z-50",
        }}
        styles={{
          drawer: { height: `calc(75% - ${swaipeYState.move}px)` },
        }}
        title="レシピ検索"
        size="75%"
        padding="sm"
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        overlayOpacity={0.3}
      >
        {TouchBarComponent}

        <SearchForm setOpened={setOpened} {...props} />
      </Drawer>
    </>
  );
};
