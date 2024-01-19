export const countHorizontalLines = (grid, playerDisc, lineLength = 4) => {
  let lineCount = 0;
  for (let row = 0; row < grid.length; row++) {
    let windowCount = 0;

    for (let i = 0; i < lineLength; i++) {
      if (grid[row][i] === playerDisc) {
        windowCount++;
      }
    }
    if (windowCount === lineLength) {
      lineCount++;
    }

    for (let col = 1; col <= grid[row].length - lineLength; col++) {
      if (grid[row][col - 1] === playerDisc) {
        windowCount--;
      }
      if (grid[row][col + lineLength - 1] === playerDisc) {
        windowCount++;
      }
      if (windowCount === lineLength) {
        lineCount++;
      }
    }
  }
  return lineCount;
};

export const countVerticalLines = (grid, playerDisc, lineLength = 4) => {
  let lineCount = 0;

  for (let col = 0; col < grid[0].length; col++) {
    let windowCount = 0;

    for (let i = 0; i < lineLength; i++) {
      if (grid[i][col] === playerDisc) {
        windowCount++;
      }
    }
    if (windowCount === lineLength) {
      lineCount++;
    }

    for (let row = 1; row <= grid.length - lineLength; row++) {
      if (grid[row - 1][col] === playerDisc) {
        windowCount--;
      }
      if (grid[row + lineLength - 1][col] === playerDisc) {
        windowCount++;
      }
      if (windowCount === lineLength) {
        lineCount++;
      }
    }
  }

  return lineCount;
};

export const countDiagonalLines = (grid, playerDisc, lineLength = 4) => {
  let lineCount = 0;

  for (let row = 0; row <= grid.length - lineLength; row++) {
    for (let col = 0; col <= grid[0].length - lineLength; col++) {
      if (isContinuousLine(grid, row, col, 1, 1, playerDisc, lineLength)) {
        lineCount++;
      }
    }
  }

  for (let row = lineLength - 1; row < grid.length; row++) {
    for (let col = 0; col <= grid[0].length - lineLength; col++) {
      if (isContinuousLine(grid, row, col, -1, 1, playerDisc, lineLength)) {
        lineCount++;
      }
    }
  }

  return lineCount;
};

const isContinuousLine = (
  grid,
  startRow,
  startCol,
  rowStep,
  colStep,
  playerDisc,
  lineLength
) => {
  for (let i = 0; i < lineLength; i++) {
    if (grid[startRow + i * rowStep][startCol + i * colStep] !== playerDisc) {
      return false;
    }
  }
  return true;
};
