export default function winner(arrSize) {
  const combinations = [];
  const generateSubsets = (array) => {
    const subsets = [];
    // Generate subsets of length from 2 up to arrSize
    for (let length = 2; length <= arrSize; length++) {
      for (let i = 0; i <= array.length - length; i++) {
        subsets.push(array.slice(i, i + length));
      }
    }
    return subsets;
  };

  // Rows
  for (let i = 0; i < arrSize; i++) {
    const row = [...Array(arrSize).keys()].map(j => i * arrSize + j);
    combinations.push(...generateSubsets(row));
  }

  // Columns
  for (let i = 0; i < arrSize; i++) {
    const col = [...Array(arrSize).keys()].map(j => i + j * arrSize);
    combinations.push(...generateSubsets(col));
  }

  // Main Diagonals (top-left to bottom-right)
  for (let i = 0; i <= arrSize - 2; i++) {
    for (let j = 0; j <= arrSize - 2; j++) {
      const diag = [...Array(arrSize).keys()].map(k => (i + k) * arrSize + (j + k));
      combinations.push(...generateSubsets(diag));
    }
  }

  // Anti-Diagonals (top-right to bottom-left)
  for (let i = 0; i <= arrSize - 2; i++) {
    for (let j = arrSize - 1; j >= 1; j--) {
      const antiDiag = [...Array(arrSize).keys()].map(k => (i + k) * arrSize + (j - k));
      combinations.push(...generateSubsets(antiDiag));
    }
  }

  return combinations;
}
