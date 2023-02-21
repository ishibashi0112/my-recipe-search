import { proxy } from "valtio";

import {
  Ingredient,
  IngredientsName,
  RecipesWithIngredients,
  SearchState,
} from "@/type/types";

export const searchState = proxy<SearchState>({
  searchedRecipes: [],
  title: "",
  selectedIngredients: [],
});

export const setSearchState = (
  initialRecipes: RecipesWithIngredients[] = [],
  title: string = "",
  selectedIngredients: Required<
    Pick<Ingredient, "furigana" | "shortName">
  >[] = []
) => {
  const filteredRecipes = initialRecipes.length
    ? filterRecipes(initialRecipes, title, selectedIngredients)
    : [];

  searchState.searchedRecipes = filteredRecipes;
  searchState.title = title;
  searchState.selectedIngredients = selectedIngredients;
};

const filterRecipes = (
  recipes: RecipesWithIngredients[],
  title: string,
  selectedIngredients: IngredientsName[]
) => {
  return recipes.filter((recipe) => {
    const containsTitle = title ? recipe.title.includes(title) : true;

    const hasIngredient = selectedIngredients.length
      ? selectedIngredients.every((selectedIngredient) => {
          return recipe.ingredients.some((ingredient) =>
            ingredient.furigana
              ? ingredient.furigana.includes(selectedIngredient.furigana)
              : false
          );
        })
      : true;

    return containsTitle && hasIngredient;
  });
};
