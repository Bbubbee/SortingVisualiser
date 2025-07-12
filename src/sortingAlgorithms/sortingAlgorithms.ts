import type { Highlight } from "../types";

export const mergeSort = () => {
  console.log("merge sort");
};

export const bubbleSort = async (
  arr: number[],
  setArray: (arr: number[]) => void,
  setHighlightedIndices: (arr: Highlight[]) => void,
  speed: number
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
      await sleep(speed);

      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        setArray([...array]);

        setHighlightedIndices([
          { index: j, color: "red" },
          { index: j + 1, color: "green" },
        ]);

        await sleep(speed);
      }
    }
  }
};

export const insertSort = async (
  arr: number[],
  setArray: (arr: number[]) => void,
  setHighlightedIndices: (arr: Highlight[]) => void
) => {
  const array = [...arr];

  for (let i = 1; i < array.length; i++) {
    const val = array[i];
    let j = i - 1;

    // Highlight the current value being inserted
    setHighlightedIndices([{ index: i, color: "yellow" }]);
    await sleep(100);

    while (j >= 0 && array[j] > val) {
      // Highlight the comparison
      setHighlightedIndices([
        { index: j, color: "red" },
        { index: j + 1, color: "blue" }, // This is the one being shifted
      ]);
      await sleep(100);

      array[j + 1] = array[j]; // Shift the bigger number right
      setArray([...array]); // Re-render after shift
      j--;
    }

    // Insert the value into its correct spot
    array[j + 1] = val;
    setArray([...array]);

    // Highlight the inserted value
    setHighlightedIndices([{ index: j + 1, color: "green" }]);
    await sleep(100);

    // Clear highlights after each insertion
    setHighlightedIndices([]);
  }
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
