import {
  Alert,
  Button,
  Card,
  Group,
  Highlight,
  Space,
  Stack,
} from "@mantine/core";
import {
  IconArrowsMaximize,
  IconExternalLink,
  IconInfoCircle,
} from "@tabler/icons";
import Image from "next/image";
import React, { FC, useCallback, useMemo, useState } from "react";

import { hiraToKata, kataToHira } from "@/lib/util/functions";
import { SearchButton } from "@/pages-component/Index/SearchButton";
import { Ingredient, RecipesState, RecipesWithIngredients } from "@/type/types";

import { ShowRecipeModal } from "./ShowRecipeModal";
import { StateBar } from "./StateBar";

type Props = {
  recipes: RecipesWithIngredients[];
  ingredientsNames: Required<Pick<Ingredient, "furigana" | "shortName">>[];
};

const joinIngredientText = (ingredients: Ingredient[]) => {
  const names = ingredients.map((ingredient) => ingredient.name);
  const joinText = names.join();
  return "材料: " + joinText;
};

export const IndexBody: FC<Props> = (props) => {
  const initialRecipes = props.recipes;
  const [opened, setOpened] = useState(false);
  const [recipe, setRecipe] = useState<RecipesWithIngredients | null>(null);
  const [recipesState, setRecipesState] = useState<RecipesState>({
    data: props.recipes,
    titleKeyword: "",
    ingredientKeyword: [],
  });

  const ingredientKeywords = useMemo(
    () =>
      recipesState.ingredientKeyword.reduce(
        (
          prev: string[],
          current: Required<Pick<Ingredient, "furigana" | "shortName">>
        ) => {
          const shortName = current.shortName;
          const toKatakanaShortName = hiraToKata(shortName);
          const tohHiraganaShortName = kataToHira(shortName);

          const furigana = current.furigana;
          const toKatakanaFurigana = hiraToKata(furigana);

          return [
            ...prev,
            shortName,
            toKatakanaShortName,
            tohHiraganaShortName,
            furigana,
            toKatakanaFurigana,
          ];
        },
        []
      ),
    [recipesState]
  );

  const handleOpen = useCallback((recipe: RecipesWithIngredients) => {
    setOpened(true);
    setRecipe(recipe);
  }, []);

  return (
    <div>
      <StateBar
        initialRecipes={initialRecipes}
        recipesState={recipesState}
        setRecipesState={setRecipesState}
      />

      <Space h={5} />

      {recipesState.data.length ? (
        <Stack spacing="xs">
          {recipesState.data.map((recipe) => (
            <Card key={recipe.id} withBorder shadow="xs" p="xs">
              <Group align="self-start" noWrap key={recipe.id}>
                <Image
                  src={recipe.imageUrl}
                  alt="recipe-image"
                  width={70}
                  height={100}
                />
                <div>
                  <Highlight
                    highlight={[
                      hiraToKata(recipesState.titleKeyword),
                      kataToHira(recipesState.titleKeyword),
                    ]}
                    lineClamp={1}
                  >
                    {recipe.title}
                  </Highlight>
                  <div>
                    <Highlight
                      highlight={ingredientKeywords}
                      color="dimmed"
                      fz="sm"
                      inline
                      lineClamp={3}
                    >
                      {joinIngredientText(recipe.ingredients)}
                    </Highlight>
                  </div>

                  <Space h={6} />

                  <Group spacing={2} position="right" align="center">
                    <Button
                      className="active:translate-y-0"
                      classNames={{ icon: "mr-1" }}
                      color="dark"
                      size="xs"
                      variant="subtle"
                      leftIcon={<IconArrowsMaximize size={14} />}
                      compact
                      onClick={() => handleOpen(recipe)}
                    >
                      全て表示
                    </Button>
                    <Button
                      className="active:translate-y-0"
                      classNames={{ icon: "mr-1" }}
                      color="yellow"
                      size="xs"
                      variant="subtle"
                      leftIcon={<IconExternalLink size={14} />}
                      compact
                      component="a"
                      href={`https://cookpad.com/recipe/${recipe.siteId}`}
                      target="_blank"
                    >
                      外部ページへ
                    </Button>
                  </Group>
                </div>
              </Group>
            </Card>
          ))}
        </Stack>
      ) : (
        <Alert className="mt-5" color="gray" icon={<IconInfoCircle />}>
          該当するレシピがありませんでした。
        </Alert>
      )}

      <ShowRecipeModal
        opened={opened}
        setOpened={setOpened}
        recipe={recipe}
        titleKeyword={recipesState.titleKeyword}
        ingredientKeywords={ingredientKeywords}
      />

      <SearchButton
        initialRecipes={initialRecipes}
        recipesState={recipesState}
        setRecipesState={setRecipesState}
        ingredientsNames={props.ingredientsNames}
      />
    </div>
  );
};
