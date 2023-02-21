import {
  Autocomplete,
  AutocompleteItem,
  Badge,
  Button,
  Card,
  CloseButton,
  Group,
  ScrollArea,
  SelectItemProps,
  Space,
  Table,
  Text,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, {
  FC,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";

import { hasExactMatchText, hasPartialMatchText } from "@/lib/util/functions";
import { IngredientsName } from "@/type/types";

type Props = {
  IngredientsNames: IngredientsName[];
  selectedIngredients: IngredientsName[];
  setSelectedIngredients: React.Dispatch<
    React.SetStateAction<IngredientsName[]>
  >;
};

export const IngredientsForm: FC<Props> = memo((props) => {
  const [value, setValue] = useState("");
  const [currentIngredients, setCurrentIngredients] = useState(
    props.IngredientsNames
  );

  const selectData = useMemo(
    () =>
      currentIngredients.map((ingredient) => ({
        value: ingredient.furigana,
        label: ingredient.shortName,
      })),
    [currentIngredients]
  );

  const isSelected = useCallback(
    (IngredientName: string): boolean =>
      props.selectedIngredients.some(
        (Ingredient) => Ingredient.furigana === IngredientName
      ),
    [props.selectedIngredients]
  );

  const handleOnChange = useCallback((value: string) => {
    setValue(value);
    setCurrentIngredients((prevIngredients) => {
      const isMatch = prevIngredients.some(
        (ingredient) => ingredient.furigana === value
      );
      if (!isMatch) return prevIngredients;

      const putTargetIngredient = prevIngredients.filter(
        (Ingredient) => Ingredient.furigana === value
      );

      const removeTargetIngredient = prevIngredients.filter(
        (Ingredient) => !(Ingredient.furigana === value)
      );

      const putTargetValueInFront = [
        ...putTargetIngredient,
        ...removeTargetIngredient,
      ];

      return putTargetValueInFront;
    });
  }, []);

  const handleSelect = useCallback(
    (item: AutocompleteItem): void => {
      if (isSelected(item.value)) {
        setValue("");
        return;
      }

      props.setSelectedIngredients((prev) => {
        const ingredient = {
          shortName: item.label as string,
          furigana: item.value,
        };

        return [...prev, ingredient];
      });

      setValue("");
    },
    [props.selectedIngredients]
  );

  const handleRemove = useCallback(
    (targetIndex: number): void => {
      props.setSelectedIngredients((prev) =>
        prev.filter((_, index) => !(index === targetIndex))
      );
    },
    [props]
  );

  const handleFilter = useCallback(
    (value: string, item: AutocompleteItem): boolean => {
      if (!value) return false;

      return hasPartialMatchText(item.value, value);
    },
    []
  );

  const AutoCompleteItem = forwardRef<HTMLDivElement, SelectItemProps>(
    function AutoCompleteItem({ value: itemValue, label, ...others }, ref) {
      const IngredientName = itemValue ? itemValue : "";
      return (
        <div ref={ref} {...others}>
          <Group color="yellow" position="apart" noWrap>
            <Text>{label}</Text>
            {isSelected(IngredientName) ? (
              <Badge color="gray">選択済み</Badge>
            ) : isSelected(value) &&
              hasPartialMatchText(IngredientName, value) ? (
              <Badge color="gray">部分一致</Badge>
            ) : hasExactMatchText(IngredientName, value) ? (
              <Badge color="yellow">完全一致</Badge>
            ) : null}
          </Group>
        </div>
      );
    }
  );

  return (
    <div>
      <Autocomplete
        className="flex-1"
        classNames={{ input: "text-base placeholder:text-sm" }}
        value={value}
        onChange={handleOnChange}
        variant="filled"
        label="材料"
        description="※平仮名での検索をお願いします。"
        placeholder="材料を絞り込む"
        icon={<IconSearch size={16} />}
        autoComplete={"off"}
        rightSection={
          value ? (
            <CloseButton
              className=" active:translate-y-0"
              size="sm"
              onClick={() => setValue("")}
            />
          ) : null
        }
        data={selectData}
        onItemSubmit={handleSelect}
        nothingFound={
          <Text align="center" fz="xs" color="dimmed">
            検索された材料はありません。
          </Text>
        }
        filter={handleFilter}
        itemComponent={AutoCompleteItem}
      />

      <Space h={7} />

      <Card className="overflow-visible" p={0}>
        <ScrollArea style={{ height: 300 }} type="always">
          <Table fontSize="xs" highlightOnHover striped>
            <thead>
              <tr>
                <th>選択中 {`${props.selectedIngredients.length}点`}</th>
                <th className="flex justify-end">
                  <Button
                    className="border-none"
                    size="xs"
                    variant="default"
                    compact
                    onClick={() => props.setSelectedIngredients([])}
                  >
                    全て削除
                  </Button>
                </th>
              </tr>
            </thead>

            {props.selectedIngredients.length ? (
              <tbody>
                {props.selectedIngredients.map((Ingredient, index) => (
                  <tr key={index}>
                    <td>{Ingredient.shortName}</td>
                    <td className="flex justify-end">
                      <CloseButton
                        className="active:translate-y-0"
                        onClick={() => handleRemove(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody className="h-10">
                <tr>
                  <td className="text-gray-400 " colSpan={2}>
                    選択中の材料はありません。
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
});

IngredientsForm.displayName = "IngredientsForm";
