import { GetStaticProps, NextPage } from "next";
import React from "react";

import { getIngredients, getRecipes } from "@/lib/firebase/firestore";
import { IndexBody } from "@/pages-component/Index/IndexBody";
import { Layout } from "@/pages-layout/layout";
import { Ingredient, Ingredients, RecipesWithIngredients } from "@/type/types";

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getRecipes();
  const ingredients = await getIngredients();

  const ingredientsNames = ingredients.reduce(
    (prev: Ingredient["name"][], current: Ingredients) => {
      const ingredientNames = current.ingredients.map((ingredient) =>
        ingredient.name.trim()
      );

      const replacedIngredientNames = ingredientNames.map((ingredientName) => {
        return (
          ingredientName
            // 括弧とその括弧の中のテキストを削除
            .replace(/[\(\（](.*)[\)\）]/, "")
            //平仮名・カタカナ・漢字・"ー"以外のテキストを削除。
            .replace(
              /[^\u3041-\u3096\u30A1-\u30F6\u3400-\u4DBF\u4E00-\u9FFF\uFF66-\uFF9F\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF01-\uFF5E\uFF61-\uFF9F\u30FC]/g,
              ""
            )
        );
      });

      const filterIngredientNames = replacedIngredientNames.filter(
        (ingredientName) => {
          if (!ingredientName) return false;
          return !prev.includes(ingredientName);
        }
      );

      return [...prev, ...filterIngredientNames];
    },
    []
  );

  return {
    props: { recipes, ingredientsNames },
  };
};

type Proos = {
  recipes: RecipesWithIngredients[];
  ingredientsNames: Ingredient["name"][];
};

const Home: NextPage<Proos> = (props) => {
  return (
    <Layout>
      <IndexBody {...props} />
    </Layout>
  );
};

export default Home;
