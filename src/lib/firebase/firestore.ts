import { Ingredients, Recipes, RecipesWithIngredients } from "@/type/types";

import { adminDB } from "./server";

export const getRecipes = async (): Promise<RecipesWithIngredients[]> => {
  const recipesSnapshot = await adminDB.collection("recipes").get();
  const recipesDocs = recipesSnapshot.docs;
  const recipes = await Promise.all(
    recipesDocs.map(async (recipesDoc) => {
      const recipe = recipesDoc.data() as Omit<Recipes, "id">;
      const ingredientsDoc = await adminDB
        .collection("ingredients")
        .doc(recipesDoc.id)
        .get();
      const ingredients = {
        ...ingredientsDoc.data(),
        id: ingredientsDoc.id,
      } as Ingredients;

      return {
        ...recipe,
        id: recipesDoc.id,
        ingredients: ingredients.ingredients,
      };
    })
  );
  return recipes;
};

export const getIngredients = async (): Promise<Ingredients[]> => {
  const ingredientsSnapshot = await adminDB.collection("ingredients").get();
  const ingredientsDocs = ingredientsSnapshot.docs;

  const ingredients = ingredientsDocs.map((ingredientsDoc) => {
    return {
      ...ingredientsDoc.data(),
      id: ingredientsDoc.id,
    } as Ingredients;
  });

  return ingredients;
};
