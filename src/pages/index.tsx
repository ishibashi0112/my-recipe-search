import { GetStaticProps, NextPage } from "next";
import React from "react";

import { getIngredients, getRecipes } from "@/lib/firebase/firestore";
import { IndexBody } from "@/pages-component/Index/IndexBody";
import { Layout } from "@/pages-layout/layout";
import {
  Ingredient,
  Ingredients,
  IngredientsName,
  RecipesWithIngredients,
} from "@/type/types";

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getRecipes();
  const ingredients = await getIngredients();

  const allIngredients = ingredients.reduce(
    (prev: IngredientsName[], current: Ingredients) => {
      const ingredientsNames = current.ingredients.reduce(
        (prev: IngredientsName[], current: Ingredient) => {
          if (
            typeof current.furigana === "undefined" ||
            typeof current.shortName === "undefined"
          ) {
            return [...prev];
          }

          return [
            ...prev,
            { shortName: current.shortName, furigana: current.furigana },
          ];
        },
        []
      );

      return [...prev, ...ingredientsNames];
    },
    []
  );

  const uniqueIngredients = Array.from(
    new Map(
      allIngredients.map((ingredient) => [ingredient.furigana, ingredient])
    ).values()
  );

  return {
    props: { recipes, ingredientsNames: uniqueIngredients },
  };
};

type Props = {
  recipes: RecipesWithIngredients[];
  ingredientsNames: IngredientsName[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <Layout>
      <IndexBody {...props} />
    </Layout>
  );
};

export default Home;
