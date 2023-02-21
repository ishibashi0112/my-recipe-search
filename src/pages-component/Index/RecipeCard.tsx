import { Badge, Button, Card, Group, Highlight, Space } from "@mantine/core";
import { IconExternalLink, IconSquareRoundedChevronRight } from "@tabler/icons";
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
import { Ingredient, RecipesWithIngredients } from "@/type/types";

type Props = {
  recipe: RecipesWithIngredients;
};

const joinIngredientText = (ingredients: Ingredient[]) => {
  const names = ingredients.map((ingredient) => ingredient.name);
  const joinText = names.join();
  return joinText;
};

export const RecipeCard: FC<Props> = (props) => {
  const { title, selectedIngredients } = useSnapshot(searchState);
  const ingredientKeywords = getIngredientKeywords(selectedIngredients);

  return (
    <Card key={props.recipe.id} withBorder shadow="xs" p={0} radius="md">
      <Group spacing={0} noWrap key={props.recipe.id}>
        <Image
          src={props.recipe.imageUrl}
          alt="recipe-image"
          width={100}
          height={128}
        />
        <div className="flex h-32 flex-col justify-between py-2 pl-3 pr-2">
          <div>
            <Highlight
              fz="sm"
              fw="bold"
              highlight={[hiraToKata(title), kataToHira(title)]}
              lineClamp={2}
            >
              {props.recipe.title}
            </Highlight>

            <Highlight
              highlight={ingredientKeywords}
              color="dimmed"
              fz="sm"
              inline
              lineClamp={3}
            >
              {`材料: ${joinIngredientText(props.recipe.ingredients)}`}
            </Highlight>
          </div>

          <Space h={6} />

          <Group position="apart" align="center" noWrap>
            <Badge color="orange" radius="sm" size="sm">
              Cook Pad
            </Badge>

            <Group spacing={2} position="right" align="center">
              <Button
                className="active:translate-y-0"
                classNames={{ icon: "mr-1" }}
                color="dark"
                size="xs"
                variant="subtle"
                leftIcon={<IconSquareRoundedChevronRight size={14} />}
                compact
                component={Link}
                href={`/recipe/${props.recipe.id}`}
              >
                詳細
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
                href={`https://cookpad.com/recipe/${props.recipe.siteId}`}
                target="_blank"
              >
                サイトへ
              </Button>
            </Group>
          </Group>
        </div>
      </Group>
    </Card>
  );
};
