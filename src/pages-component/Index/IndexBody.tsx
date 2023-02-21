import { Alert, Space } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import React, { FC } from "react";
import { useSnapshot } from "valtio";

import { searchState } from "@/lib/store/state";
import { SearchButton } from "@/pages-component/Index/SearchButton";
import { IngredientsName, RecipesWithIngredients } from "@/type/types";

import { Recipes } from "./Recipes";
import { StateBar } from "./StateBar";

type Props = {
  recipes: RecipesWithIngredients[];
  ingredientsNames: IngredientsName[];
};

export const IndexBody: FC<Props> = (props) => {
  const initialRecipes = props.recipes;

  const { title, selectedIngredients, searchedRecipes } =
    useSnapshot(searchState);

  return (
    <div>
      <StateBar initialRecipes={initialRecipes} />

      <Space h={5} />

      {searchedRecipes.length ? (
        <Recipes recipes={searchedRecipes as RecipesWithIngredients[]} />
      ) : title || selectedIngredients.length ? (
        <Alert className="mt-5" color="gray" icon={<IconInfoCircle />}>
          該当するレシピがありませんでした。
        </Alert>
      ) : (
        <Recipes recipes={initialRecipes} />
      )}

      <SearchButton
        initialRecipes={initialRecipes}
        ingredientsNames={props.ingredientsNames}
      />
    </div>
  );
};
