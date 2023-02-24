import {
  ActionIcon,
  Group,
  Highlight,
  Space,
  Table,
  Title,
} from "@mantine/core";
import { IconHome2 } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { useSnapshot } from "valtio";

import { searchState } from "@/lib/store/state";
import {
  getIngredientKeywords,
  hiraToKata,
  kataToHira,
} from "@/lib/util/functions";
import { RecipesWithIngredients } from "@/type/types";

type Props = { recipe: RecipesWithIngredients };

export const RecipeBody: FC<Props> = (props) => {
  const { title, selectedIngredients } = useSnapshot(searchState);
  const ingredientKeywords = getIngredientKeywords(selectedIngredients);
  return (
    <>
      <Group position="center">
        <Image
          className="rounded-md"
          src={props.recipe.imageUrl}
          width={200}
          height={250}
          alt="recipe_image"
        />
      </Group>

      <Space h={20} />

      <Title order={5}>
        <Highlight highlight={[hiraToKata(title), kataToHira(title)]}>
          {props.recipe.title}
        </Highlight>
      </Title>

      <Space h={5} />

      <div className="rounded-md border-[1px] border-solid border-gray-300">
        <Table striped highlightOnHover fontSize="xs">
          <thead>
            <tr>
              <th>材料</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.recipe.ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>
                  <Highlight highlight={ingredientKeywords}>
                    {ingredient.name}
                  </Highlight>
                </td>
                <td className="flex justify-end">{ingredient.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Space h={10} />

      <Group position="right">

        <ActionIcon
          className=" fixed bottom-12 right-5"
          variant="light"
          radius="xl"
          color="dark"
          size={60}
          component={Link}
          href="/"
        >
          <IconHome2 size={30} />
        </ActionIcon>
      </Group>
    </>
  );
};
