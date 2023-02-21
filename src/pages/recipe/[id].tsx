import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { getRecipe } from "@/lib/firebase/firestore";
import { RecipeBody } from "@/pages-component/Recipe/RecipeBody";
import { Layout } from "@/pages-layout/layout";
import { RecipesWithIngredients } from "@/type/types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id as string;
  const recipe = await getRecipe(id);

  return { props: { recipe } };
};

type Props = { recipe: RecipesWithIngredients };

const RecipeId: NextPage<Props> = (props) => {
  return (
    <Layout>
      <RecipeBody recipe={props.recipe} />{" "}
    </Layout>
  );
};

export default RecipeId;
