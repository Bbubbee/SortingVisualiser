import type { Highlight } from "../types";

// export const mergeSortHelper = (arr: number[]) => {
//   // Call merge sort
//   let merged = mergeSort(arr);
// };

export const mergeSort = (arr: number[]): number[] => {
  if (arr.length < 2) {
    return arr;
  }

  const midIndex = Math.floor(arr.length / 2);
  const leftHalf = mergeSort(arr.slice(0, midIndex));
  const rightHalf = mergeSort(arr.slice(midIndex));

  return merge(leftHalf, rightHalf);
};

const merge = (left: number[], right: number[]): number[] => {
  let result: number[] = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Push remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
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
  setHighlightedIndices: (arr: Highlight[]) => void,
  speed: number // <-- add speed parameter
) => {
  const array = [...arr];

  for (let i = 1; i < array.length; i++) {
    const val = array[i];
    let j = i - 1;

    // Highlight the current value being inserted
    setHighlightedIndices([{ index: i, color: "yellow" }]);
    await sleep(speed);

    while (j >= 0 && array[j] > val) {
      // Highlight the comparison
      setHighlightedIndices([
        { index: j, color: "red" },
        { index: j + 1, color: "blue" }, // This is the one being shifted
      ]);
      await sleep(speed);

      array[j + 1] = array[j]; // Shift the bigger number right
      setArray([...array]); // Re-render after shift
      j--;
    }

    // Insert the value into its correct  spot
    array[j + 1] = val;
    setArray([...array]);

    // Highlight the inserted value
    setHighlightedIndices([{ index: j + 1, color: "green" }]);
    await sleep(speed);

    // Clear highlights after each insertion
    setHighlightedIndices([]);
  }
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
