import {
  Alert,
  Button,
  Group,
  Highlight,
  Image,
  Modal,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowsMaximize,
  IconExternalLink,
  IconInfoCircle,
  IconSearch,
} from "@tabler/icons";
import React, { FC, useCallback, useState } from "react";

import { SearchButton } from "@/pages-component/Index/SearchButton";
import { Ingredient, RecipesState, RecipesWithIngredients } from "@/type/types";

type Proos = {
  recipes: RecipesWithIngredients[];
  ingredientsNames: Ingredient["name"][];
};

const joinIngredientText = (ingredients: Ingredient[]) => {
  const names = ingredients.map((ingredient) => ingredient.name);
  const joinText = names.join();
  return "材料: " + joinText;
};

export const IndexBody: FC<Proos> = (props) => {
  const initialRecipes = props.recipes;
  const [opened, setOpened] = useState(false);
  const [recipe, setRecipe] = useState<RecipesWithIngredients | null>(null);
  const [recipesState, setRecipesState] = useState<RecipesState>({
    data: props.recipes,
    titleKeyword: "",
    ingredientKeyword: [],
  });

  const handleOpen = useCallback((recipe: RecipesWithIngredients) => {
    setOpened(true);
    setRecipe(recipe);
  }, []);

  return (
    <div>
      {recipesState.data.length !== initialRecipes.length ? (
        <Alert color="gray" icon={<IconSearch size={16} />}>
          <Group position="apart">
            <Text fz="sm">{`検索結果 : ${recipesState.data.length}件`}</Text>
            <Button
              className="border-none active:translate-y-0"
              variant="default"
              color="gray"
              size="xs"
              compact
              onClick={() =>
                setRecipesState({
                  data: initialRecipes,
                  titleKeyword: "",
                  ingredientKeyword: [],
                })
              }
            >
              クリア
            </Button>
          </Group>

          {recipesState.titleKeyword && (
            <Text fz="sm">{`タイトル : ${recipesState.titleKeyword}`}</Text>
          )}
          {recipesState.ingredientKeyword.length ? (
            <Text fz="sm">{`材料 : ${recipesState.ingredientKeyword.map(
              (ingredient) => `${ingredient}`
            )}`}</Text>
          ) : null}
        </Alert>
      ) : (
        <Text fz="sm">{`レシピ総数 ${initialRecipes.length}件`}</Text>
      )}

      <Space h={5} />

      {recipesState.data.length ? (
        <Stack>
          {recipesState.data.map((recipe) => (
            <Group align="self-start" noWrap key={recipe.id}>
              <Image src={recipe.imageUrl} width={70} height={100} />
              <div>
                <Highlight highlight={recipesState.titleKeyword} lineClamp={1}>
                  {recipe.title}
                </Highlight>
                <div>
                  <Highlight
                    highlight={recipesState.ingredientKeyword}
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
                    全てを表示
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
          ))}
        </Stack>
      ) : (
        <Alert className="mt-5" color="gray" icon={<IconInfoCircle />}>
          該当するレシピがありませんでした。
        </Alert>
      )}

      <Modal opened={opened} onClose={() => setOpened(false)}>
        {recipe && (
          <div>
            <Group position="center">
              <Image
                src={recipe.imageUrl}
                width={150}
                height={200}
                alt="recipe_image"
              />
            </Group>

            <Space h={10} />

            <Title order={5}>
              <Highlight highlight={recipesState.titleKeyword}>
                {recipe.title}
              </Highlight>
            </Title>

            <Space h={5} />

            <div>
              <Text>材料</Text>
              <Text color="dimmed" fz="sm" inline lineClamp={3}>
                {recipe.ingredients.map((ingredient, index) => (
                  <Group key={index} position="apart">
                    <Highlight highlight={recipesState.ingredientKeyword}>
                      {ingredient.name}
                    </Highlight>
                    <Text>{ingredient.quantity}</Text>
                  </Group>
                ))}
              </Text>
            </div>
          </div>
        )}
      </Modal>

      <SearchButton
        initialRecipes={initialRecipes}
        recipesState={recipesState}
        setRecipesState={setRecipesState}
        ingredientsNames={props.ingredientsNames}
      />
    </div>
  );
};
