import { Group, Highlight, Modal, Space, Table, Title } from "@mantine/core";
import Image from "next/image";
import React, { FC } from "react";

import { hiraToKata, kataToHira } from "@/lib/util/functions";
import { RecipesWithIngredients } from "@/type/types";

export type Props = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  recipe: RecipesWithIngredients | null;
  titleKeyword: string;
  ingredientKeywords: string[];
};

export const ShowRecipeModal: FC<Props> = (props) => {
  return (
    <div>
      <Modal opened={props.opened} onClose={() => props.setOpened(false)}>
        {props.recipe && (
          <div>
            <Group position="center">
              <Image
                src={props.recipe.imageUrl}
                width={150}
                height={200}
                alt="recipe_image"
              />
            </Group>

            <Space h={10} />

            <Title order={5}>
              <Highlight
                highlight={[
                  hiraToKata(props.titleKeyword),
                  kataToHira(props.titleKeyword),
                ]}
              >
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
                        <Highlight highlight={props.ingredientKeywords}>
                          {ingredient.name}
                        </Highlight>
                      </td>
                      <td className="flex justify-end">
                        {ingredient.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
