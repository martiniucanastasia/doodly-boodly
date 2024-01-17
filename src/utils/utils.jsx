export const countHorizontalLines = (grid, playerDisc, lineLength) => {
  let lineCount = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col <= grid[0].length - lineLength; col++) {
      let count = 0;
      for (let i = 0; i < lineLength; i++) {
        if (grid[row][col + i] === playerDisc) {
          count++;
        } else {
          break;
        }
      }
      if (count === lineLength) {
        lineCount++;
      }
    }
  }
  return lineCount;
};

export const countVerticalLines = (grid, playerDisc, lineLength) => {
  let lineCount = 0;
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = 0; row <= grid.length - lineLength; row++) {
      let count = 0;
      for (let i = 0; i < lineLength; i++) {
        if (grid[row + i][col] === playerDisc) {
          count++;
        } else {
          break;
        }
      }
      if (count === lineLength) {
        lineCount++;
      }
    }
  }
  return lineCount;
};

export const countDiagonalLines = (grid, playerDisc, lineLength) => {
  let lineCount = 0;

  // Check for diagonals with positive slope
  for (let row = 0; row <= grid.length - lineLength; row++) {
    for (let col = 0; col <= grid[0].length - lineLength; col++) {
      let count = 0;
      for (let i = 0; i < lineLength; i++) {
        if (grid[row + i][col + i] === playerDisc) {
          count++;
        } else {
          break;
        }
      }
      if (count === lineLength) {
        lineCount++;
      }
    }
  }

  // Check for diagonals with negative slope
  for (let row = lineLength - 1; row < grid.length; row++) {
    for (let col = 0; col <= grid[0].length - lineLength; col++) {
      let count = 0;
      for (let i = 0; i < lineLength; i++) {
        if (grid[row - i][col + i] === playerDisc) {
          count++;
        } else {
          break;
        }
      }
      if (count === lineLength) {
        lineCount++;
      }
    }
  }

  return lineCount;
};
