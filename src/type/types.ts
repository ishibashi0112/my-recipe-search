export type Ingredient = {
  name: string;
  quantity: string;
  shortName?: string;
  furigana?: string;
};

export type Ingredients = {
  id: string;
  ingredients: Ingredient[];
};

export type Recipes = {
  id: string;
  title: string;
  siteId: string;
  imageUrl: string;
};

export type RecipesWithIngredients = Recipes & {
  ingredients: Ingredient[];
};

export type RecipesState = {
  data: RecipesWithIngredients[];
  titleKeyword: string;
  ingredientKeyword: Required<Pick<Ingredient, "furigana" | "shortName">>[];
};

export type AnalyzedIngredientsName = {
  name: string;
  furigana: string;
};
