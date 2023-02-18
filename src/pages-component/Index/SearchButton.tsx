import {
  Alert,
  Button,
  Group,
  Loader,
  LoadingOverlay,
  Modal,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { FC, useCallback, useState } from "react";

import { Ingredient, RecipesState, RecipesWithIngredients } from "@/type/types";

import { IngredientsForm } from "./IngredientsForm";

type Props = {
  initialRecipes: RecipesWithIngredients[];
  recipesState: RecipesState;
  setRecipesState: React.Dispatch<React.SetStateAction<RecipesState>>;
  ingredientsNames: Required<Pick<Ingredient, "furigana" | "shortName">>[];
};

const filterRecipes = (
  recipes: RecipesWithIngredients[],
  title: string,
  selectedIngredients: Required<Pick<Ingredient, "furigana" | "shortName">>[],
  furiganaTexts: string[] = []
) => {
  return recipes.filter((recipe) => {
    const containsTitleKeyword = title ? recipe.title.includes(title) : true;

    const hasIngredient = selectedIngredients.length
      ? selectedIngredients.every((selectedIngredient) => {
          return recipe.ingredients.some((ingredient) =>
            ingredient.furigana
              ? ingredient.furigana.includes(selectedIngredient.furigana)
              : false
          );
        })
      : true;

    return containsTitleKeyword && hasIngredient;
  });
};

export const SearchButton: FC<Props> = (props) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<
    Required<Pick<Ingredient, "furigana" | "shortName">>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = useCallback(() => {
    setOpened(true);

    if (
      props.recipesState.data.length === props.initialRecipes.length &&
      selectedIngredients.length > 0
    ) {
      setSelectedIngredients([]);
    }
    if (
      props.recipesState.data.length === props.initialRecipes.length &&
      title
    ) {
      setTitle("");
    }
  }, [props, selectedIngredients, title]);

  const handleClear = useCallback(() => {
    setTitle("");
    setSelectedIngredients([]);
    props.setRecipesState({
      data: props.initialRecipes,
      titleKeyword: "",
      ingredientKeyword: [],
    });
  }, [props]);

  const handleSubmit = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    const filteredRecipes = filterRecipes(
      props.initialRecipes,
      title,
      selectedIngredients
    );

    props.setRecipesState({
      data: filteredRecipes,
      titleKeyword: title,
      ingredientKeyword: selectedIngredients,
    });

    setOpened(false);
    setIsLoading(false);
  }, [title, selectedIngredients, props]);

  return (
    <>
      <Button
        className="fixed bottom-12 right-5 active:bg-yellow-400"
        color="yellow"
        radius="xl"
        size="md"
        leftIcon={<IconSearch size={16} />}
        onClick={() => handleOpen()}
      >
        検索
      </Button>

      <Modal
        classNames={{ title: " font-semibold  font-serif" }}
        title="レシピ検索"
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnClickOutside={!isLoading}
      >
        <Stack spacing="xs">
          <TextInput
            classNames={{ input: "text-base placeholder:text-sm" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="filled"
            label="タイトル"
            placeholder="料理名で探す"
            icon={<IconSearch size={16} />}
            autoComplete={"off"}
          />

          <IngredientsForm
            IngredientsNames={props.ingredientsNames}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />

          <Space h={5} />

          <Group position="right" spacing="sm">
            <Button onClick={handleClear} variant="default" size="xs">
              クリア
            </Button>

            <Button
              type="submit"
              color="yellow"
              size="xs"
              onClick={() => handleSubmit()}
            >
              検索
            </Button>
          </Group>
        </Stack>
        <LoadingOverlay
          visible={isLoading}
          loader={
            <Alert color="yellow">
              <Group position="center">
                <Loader size="sm" color="yellow" />
              </Group>

              <Text mt={5} fw={800} color="orange">
                loading...
              </Text>
            </Alert>
          }
        />
      </Modal>
    </>
  );
};
