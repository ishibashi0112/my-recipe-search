import { IngredientsName } from "@/type/types";

export const hiraToKata = (str: string): string => {
  return str.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
};

export const kataToHira = (str: string): string => {
  return str.replace(/[\u30A1-\u30F6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
};

export const hasPartialMatchText = (
  targetText: string,
  currentText: string
): boolean => {
  const toKatakanaText = hiraToKata(currentText);
  const toHIraganaText = kataToHira(currentText);
  const targetTexts = [currentText, toKatakanaText, toHIraganaText];
  return targetTexts.some((txt) => targetText.includes(txt));
};

export const hasExactMatchText = (
  targetText: string,
  currentText: string
): boolean => {
  const toKatakanaText = hiraToKata(currentText);
  const toHIraganaText = kataToHira(currentText);
  const targetTexts = [currentText, toKatakanaText, toHIraganaText];

  return targetTexts.some((txt) => targetText === txt);
};

export const getIngredientKeywords = (ingredients: any): string[] => {
  return ingredients.reduce((prev: string[], current: IngredientsName) => {
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
  }, []);
};
