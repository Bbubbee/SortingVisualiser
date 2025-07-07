import type { Highlight } from "../types";

export const mergeSort = () => {
  console.log("merge sort");
};

export const bubbleSort = async (
  arr: number[],
  setArray: (arr: number[]) => void,
  setHighlightedIndices: (arr: Highlight[]) => void
) => {
  // Copy of the array.
  const array = [...arr];

  // Go through the array multiple times.
  for (let i = 0; i < array.length; i++) {
    // Go through each number in the array, comparing it with the number ahead.
    for (let j = 0; j < array.length - i - 1; j++) {
      // Highlight the two bars being compared
      setHighlightedIndices([
        { index: j, color: "green" },
        { index: j + 1, color: "red" },
      ]);
      await sleep(500);

      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        setArray([...array]);

        setHighlightedIndices([
          { index: j, color: "green" },
          { index: j + 1, color: "red" },
        ]);

        await sleep(500);
      }
    }
  }

  return array;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
