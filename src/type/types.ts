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

export type IngredientsName = Required<
  Pick<Ingredient, "furigana" | "shortName">
>;

export type SearchState = {
  searchedRecipes: RecipesWithIngredients[];
  title: string;
  selectedIngredients: IngredientsName[];
};

export type AnalyzedIngredientsName = {
  name: string;
  furigana: string;
};
