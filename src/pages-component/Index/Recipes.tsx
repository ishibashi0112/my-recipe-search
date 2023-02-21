import { Stack } from "@mantine/core";
import React, { FC } from "react";

import { RecipesWithIngredients } from "@/type/types";

import { RecipeCard } from "./RecipeCard";

type Props = {
  recipes: RecipesWithIngredients[];
};

export const Recipes: FC<Props> = (props) => {
  return (
    <Stack spacing="xs">
      {props.recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Stack>
  );
};
