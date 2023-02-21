import { ActionIcon, Alert, Button, Group, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSearch } from "@tabler/icons";
import React, { FC, useState } from "react";
import { useSnapshot } from "valtio";

import { searchState, setSearchState } from "@/lib/store/state";
import { RecipesWithIngredients } from "@/type/types";

type Proos = {
  initialRecipes: RecipesWithIngredients[];
};

export const StateBar: FC<Proos> = (props) => {
  const [isDisplay, setIsDisplay] = useState(true);
  const { title, selectedIngredients, searchedRecipes } =
    useSnapshot(searchState);

  if (!searchedRecipes.length) {
    return <Text fz="sm">{`レシピ総数 ${props.initialRecipes.length}件`}</Text>;
  }

  if (isDisplay && searchedRecipes.length) {
    return (
      <Alert
        className="sticky top-2 z-50 mb-2 shadow-md"
        color="yellow"
        icon={<IconSearch size={16} />}
      >
        <Group position="apart">
          <Text fz="sm">{`検索結果 : ${searchedRecipes.length}件`}</Text>
          <Group spacing="xs">
            <Button
              className="active:translate-y-0"
              variant="outline"
              color="yellow"
              size="xs"
              compact
              onClick={() => setSearchState([], "", [])}
            >
              クリア
            </Button>
            <ActionIcon
              size="sm"
              color="yellow"
              variant="light"
              onClick={() => setIsDisplay(false)}
            >
              <IconChevronUp size={16} />
            </ActionIcon>
          </Group>
        </Group>

        {title && <Text fz="sm">{`タイトル : ${title}`}</Text>}
        {selectedIngredients.length ? (
          <Text fz="sm">{`材料 : ${selectedIngredients.map(
            (ingredient) => `${ingredient.shortName}`
          )}`}</Text>
        ) : null}
      </Alert>
    );
  }
  return (
    <Group className="sticky top-5 z-50" position="right">
      <ActionIcon
        color="yellow"
        variant="light"
        onClick={() => setIsDisplay(true)}
      >
        <IconChevronDown />
      </ActionIcon>
    </Group>
  );
};
