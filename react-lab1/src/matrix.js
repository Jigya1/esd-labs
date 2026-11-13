// Plain functions on the matrix: no React in this file, so the tests can check them
// with one line each. A matrix is an array of rows; each row is an array of numbers.
//
//   [[1, 2, 3],
//    [4, 5, 6],      matrix[1][2] is row 1, column 2 (counting from 0) → 6
//    [7, 8, 9]]

// The numbers the app starts with (section 07). Given.
export const START = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Section 08 — a NEW matrix with one cell increased by one.
//   incrementAt([[1, 2], [3, 4]], 1, 0)  →  [[1, 2], [4, 4]]
// Never change `matrix` (the tests freeze it, so changing it throws).
// Rows you don't touch must stay the SAME arrays; only the changed row is new.
export function incrementAt(matrix, row, col, step = 1) {
  return matrix.map((currentRow, r) => {
    if (r === row) {
      const newRow = [...currentRow];
      newRow[col] += step;
      return newRow;
    }
    return currentRow;
  });
}

// Section 09 — numbers worked out from the matrix, never stored.
//   stats([[1, 0], [3, 4]])  →  { sum: 8, average: 2, max: 4, nonZero: 3 }
// average = sum ÷ the number of cells. An empty matrix, [], gives 0 for all four.
export function stats(matrix) {
  const list = matrix.flat();
  if (list.length === 0) {
    return { sum: 0, average: 0, max: 0, nonZero: 0 };
  }
  const sum = list.reduce((s, num) => s + num, 0);
  const avg = sum / list.length;
  const max = Math.max(...list);
  const nonZeroValues = list.filter((num) => num !== 0);
  const nonZero = nonZeroValues.length;
  return { sum: sum, average: avg, max: max, nonZero: nonZero };
}

// Section 12 (stretch) — the same shape, every cell 0.
//   zeros([[1, 2], [3, 4]])  →  [[0, 0], [0, 0]]
export function zeros(matrix) {
  return matrix.map((currentRow) => {
    return currentRow.map(() => {
      return 0;
    });
  });
}

// IN-LAB TASK (AI closed) — leave this until the lab. See inlab/decrement.check.jsx.
export function decrementAt(matrix, row, col) {
  throw new Error("TODO");
}
