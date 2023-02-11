import {
  Badge,
  Button,
  Card,
  CloseButton,
  Divider,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons";
import React, { FC, useCallback, useRef, useState, useTransition } from "react";

import { Ingredient } from "@/type/types";

type Props = {
  IngredientsNames: Ingredient["name"][];
  selectedIngredients: Ingredient["name"][];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
};

const hiraToKata = (str: string): string => {
  return str.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
};
const kanaToHira = (str: string): string => {
  return str.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
};

export const IngredientsForm: FC<Props> = React.memo((props) => {
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLInputElement | null>(null);
  const [ingredients, setIngredients] = useState(props.IngredientsNames);

  const isSelected = useCallback(
    (IngredientName: string): boolean =>
      props.selectedIngredients.includes(IngredientName),
    [props.selectedIngredients]
  );

  const handleSelect = useCallback((IngredientName: string) => {
    props.setSelectedIngredients((prev) => [...prev, IngredientName]);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (ingredients.length) {
      props.setSelectedIngredients(ingredients);
    }
  }, [ingredients]);

  const handleRemove = useCallback((targetIndex: number): void => {
    props.setSelectedIngredients((prev) =>
      prev.filter((_, index) => !(index === targetIndex))
    );
  }, []);

  const handleRemoveAll = useCallback((): void => {
    props.setSelectedIngredients([]);
  }, []);

  const handleTextClear = useCallback(() => {
    if (ref.current) ref.current.value = "";
    setIngredients(props.IngredientsNames);
  }, [props.IngredientsNames]);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const text = event.currentTarget.value;
        const filteredIngredients = props.IngredientsNames.filter(
          (IngredientsName) => {
            //平仮名のみテキストは、カタカナも検索結果に含める
            if (/^[ぁ-ん]+$/.test(text)) {
              const toKataText = hiraToKata(text);
              const targetTexts = [text, toKataText];
              return targetTexts.some((txt) => IngredientsName.includes(txt));
            }
            //カタカナのみテキストは、平仮名も検索結果に含める
            if (/^[ァ-ヶ]+$/.test(text)) {
              const toHiraText = kanaToHira(text);
              const targetTexts = [text, toHiraText];
              return targetTexts.some((txt) => IngredientsName.includes(txt));
            }

            return IngredientsName.includes(text);
          }
        );
        setIngredients(filteredIngredients);
      },
      [props.IngredientsNames]
    );

  return (
    <div>
      <Text mb={1} fz="sm">
        材料
      </Text>
      <Card p={0} withBorder>
        <div>
          <Group className="pr-2">
            <TextInput
              className="flex-1 "
              classNames={{ input: "text-base placeholder:text-sm" }}
              ref={ref}
              onChange={handleOnChange}
              variant="unstyled"
              placeholder="材料を絞り込む"
              icon={<IconSearch size={16} />}
              autoComplete={"off"}
              rightSection={
                ref.current?.value ? (
                  <CloseButton
                    className=" active:translate-y-0"
                    size="sm"
                    onClick={handleTextClear}
                  />
                ) : null
              }
            />
            <Button
              className="border-none active:translate-y-0"
              variant="default"
              color="gray"
              size="xs"
              compact
              disabled={!ref.current?.value.length}
              onClick={handleSelectAll}
            >
              全て選択
            </Button>
          </Group>
          <Divider />

          <ScrollArea className="p-2" style={{ height: 150 }} type="always">
            <Stack spacing={1}>
              {ingredients.length ? (
                ingredients.map((IngredientName, index) => (
                  <NavLink
                    className="p-1 active:bg-gray-100"
                    label={IngredientName}
                    onClick={() => handleSelect(IngredientName)}
                    key={index}
                    icon={<IconPlus size={16} />}
                    component="button"
                    disabled={isSelected(IngredientName)}
                    rightSection={
                      isSelected(IngredientName) ? (
                        <Badge color="gray">選択済み</Badge>
                      ) : null
                    }
                  />
                ))
              ) : (
                <Text className="mt-10" align="center" fz="xs" color="dimmed">
                  検索された材料はありません。
                </Text>
              )}
            </Stack>
          </ScrollArea>
        </div>

        <Divider />

        <div className="min-h-[200px] p-2">
          <Group position="apart">
            <Text fz="xs">
              選択中 {`${props.selectedIngredients.length}点`}
            </Text>
            <Button
              className="border-none"
              size="xs"
              variant="default"
              compact
              onClick={handleRemoveAll}
            >
              全て削除
            </Button>
          </Group>
          {props.selectedIngredients.length ? (
            <Stack spacing={1}>
              {props.selectedIngredients.map((IngredientName, index) => (
                <Group
                  className="flex justify-between hover:bg-gray-100 "
                  key={index}
                >
                  <Text fz="sm">{IngredientName}</Text>
                  <CloseButton
                    className="active:translate-y-0"
                    onClick={() => handleRemove(index)}
                  />
                </Group>
              ))}
            </Stack>
          ) : (
            <Text className="mt-10" align="center" fz="xs" color="dimmed">
              選択中の材料はありません。
            </Text>
          )}
        </div>
      </Card>
    </div>
  );
});

IngredientsForm.displayName = "IngredientsForm";
