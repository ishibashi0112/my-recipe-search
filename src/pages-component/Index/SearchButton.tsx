import { Button, Drawer } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { FC, useState } from "react";

import { IngredientsName, RecipesWithIngredients } from "@/type/types";

import { SearchForm } from "./SearchForm";

type Props = {
  initialRecipes: RecipesWithIngredients[];
  ingredientsNames: IngredientsName[];
};

export const SearchButton: FC<Props> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-12 right-5 active:bg-yellow-400"
        color="yellow"
        radius="xl"
        size="md"
        leftIcon={<IconSearch size={16} />}
        onClick={() => setOpened(true)}
      >
        検索
      </Button>

      <Drawer
        classNames={{
          title: " font-semibold  font-serif",
          drawer: "rounded-t-lg pt-5",
        }}
        title="レシピ検索"
        size="75%"
        padding="sm"
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        overlayOpacity={0.3}
      >
        <div className="absolute top-2 flex h-3 w-screen items-center justify-center">
          <div className="h-1 w-20 -translate-x-1/2 rounded-xl bg-gray-400" />
        </div>

        <SearchForm setOpened={setOpened} {...props} />
      </Drawer>
    </>
  );
};
