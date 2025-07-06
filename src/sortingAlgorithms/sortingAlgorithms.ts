export const mergeSort = () => {
  console.log("merge sort");
};

export const bubbleSort = (arr: number[]) => {
  // Copy of the array.
  const array = [...arr];

  // Go through the array multiple times.
  for (let i = 0; i < array.length; i++) {
    // Go through each number in the array, comparing it with the number ahead.
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
};
