import { Button, Group, Space, Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { FC, useCallback, useState } from "react";
import { useSnapshot } from "valtio";

import { searchState, setSearchState } from "@/lib/store/state";
import { IngredientsName, RecipesWithIngredients } from "@/type/types";

import { IngredientsForm } from "./IngredientsForm";

type Props = {
  initialRecipes: RecipesWithIngredients[];
  ingredientsNames: IngredientsName[];
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchForm: FC<Props> = (props) => {
  const snap = useSnapshot(searchState);
  const prevSelectedIngredients = snap.selectedIngredients as IngredientsName[];
  const [title, setTitle] = useState(snap.title ? snap.title : "");
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientsName[]
  >(prevSelectedIngredients.length ? prevSelectedIngredients : []);

  const handleClear = useCallback(() => {
    setTitle("");
    setSelectedIngredients([]);
    setSearchState([], "", []);
  }, []);

  const handleSubmit = useCallback((): void => {
    setSearchState(props.initialRecipes, title, selectedIngredients);

    props.setOpened(false);
  }, [title, selectedIngredients, props]);

  return (
    <>
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
          <Button onClick={handleClear} variant="default" size="sm">
            クリア
          </Button>

          <Button
            type="submit"
            color="yellow"
            size="sm"
            onClick={() => handleSubmit()}
          >
            検索
          </Button>
        </Group>
      </Stack>
    </>
  );
};
