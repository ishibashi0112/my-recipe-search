import { ActionIcon, Alert, Button, Group, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSearch } from "@tabler/icons";
import React, { FC, useState } from "react";

import { RecipesState, RecipesWithIngredients } from "@/type/types";

type Proos = {
  initialRecipes: RecipesWithIngredients[];
  recipesState: RecipesState;
  setRecipesState: React.Dispatch<React.SetStateAction<RecipesState>>;
};

export const StateBar: FC<Proos> = (props) => {
  const [isDisplay, setIsDisplay] = useState(true);

  if (props.recipesState.data.length === props.initialRecipes.length) {
    return <Text fz="sm">{`レシピ総数 ${props.initialRecipes.length}件`}</Text>;
  }

  if (isDisplay) {
    return (
      <Alert
        className="sticky top-2 z-50 mb-2 shadow-md"
        color="yellow"
        icon={<IconSearch size={16} />}
      >
        <Group position="apart">
          <Text fz="sm">{`検索結果 : ${props.recipesState.data.length}件`}</Text>
          <Group spacing="xs">
            <Button
              className="active:translate-y-0"
              variant="outline"
              color="yellow"
              size="xs"
              compact
              onClick={() =>
                props.setRecipesState({
                  data: props.initialRecipes,
                  titleKeyword: "",
                  ingredientKeyword: [],
                })
              }
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

        {props.recipesState.titleKeyword && (
          <Text fz="sm">{`タイトル : ${props.recipesState.titleKeyword}`}</Text>
        )}
        {props.recipesState.ingredientKeyword.length ? (
          <Text fz="sm">{`材料 : ${props.recipesState.ingredientKeyword.map(
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
