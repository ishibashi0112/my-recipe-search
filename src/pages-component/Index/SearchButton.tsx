import { Button, Group, Modal, Space, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { FC, useCallback, useState } from "react";

import { Ingredient, RecipesState, RecipesWithIngredients } from "@/type/types";

import { IngredientsForm } from "./IngredientsForm";

type Props = {
  initialRecipes: RecipesWithIngredients[];
  recipesState: RecipesState;
  setRecipesState: React.Dispatch<React.SetStateAction<RecipesState>>;
  ingredientsNames: Ingredient["name"][];
};

const filterRecipes = (
  recipes: RecipesWithIngredients[],
  title: string,
  selectedIngredients: Ingredient["name"][]
) => {
  return recipes.filter((recipe) => {
    const containsTitleKeyword = title ? recipe.title.includes(title) : true;

    const hasIngredient = selectedIngredients.length
      ? selectedIngredients.every((selectedIngredient) => {
          return recipe.ingredients.some((ingredient) =>
            ingredient.name.includes(selectedIngredient)
          );
        })
      : true;
    return containsTitleKeyword && hasIngredient;
  });
};

export const SearchButton: FC<Props> = (props) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

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

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setTitle(event.currentTarget.value);
    }, []);

  const handleClear = useCallback(() => {
    setTitle("");
    setSelectedIngredients([]);
    props.setRecipesState({
      data: props.initialRecipes,
      titleKeyword: "",
      ingredientKeyword: [],
    });
  }, [props]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

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
    },
    [title, selectedIngredients, props]
  );

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
      >
        <form className="space-y-2" onSubmit={handleSubmit}>
          <TextInput
            value={title}
            onChange={handleOnChange}
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

            <Button type="submit" color="yellow" size="xs">
              検索
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};
