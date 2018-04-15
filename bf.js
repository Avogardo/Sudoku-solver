const solveSudoku = (grid) => {
  const l = [0, 0];

  if (!findUnassignedLocation(grid, l)) {
    return true;
  }

  const row = l[0]
  const col = l[1];

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;

      if (solveSudoku(grid)) {
        return true;
      }
      
      grid[row][col] = 0;
    }
  }

  return false;
};

const findUnassignedLocation = (grid, l) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        l[0] = row;
        l[1] = col;
        return true;
      }
    }
  }

  return false;
};

const usedInRow = (grid, row, num) => {
  for (let col = 0; col < 9; col++) {
    if (grid[row][col] === num) {
      return true;
    }
  }
  return false;
};

const usedInCol = (grid, col, num) => {
  for (let row = 0; row < 9; row++) {
    if (grid[row][col] === num) {
      return true;
    }
  }
  return false;
};

const usedInBox = (grid, boxStartRow, boxStartCol, num) => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row + boxStartRow][col + boxStartCol] === num) {
        return true;
      }
    }
  }

  return false;
};

const isSafe = (grid, row, col, num) => {
  return !usedInRow(grid, row, num) &&
    !usedInCol(grid, col, num) &&
    !usedInBox(grid, row - row % 3, col - col % 3, num);
};

const printGrid = (grid) => {
  console.log(grid);
};

const main = () => {
  const grid = [
    [3,0,6,5,0,8,4,0,0],
    [5,2,0,0,0,0,0,0,0],
    [0,8,7,0,0,0,0,3,1],
    [0,0,3,0,1,0,0,8,0],
    [9,0,0,8,6,3,0,0,5],
    [0,5,0,0,9,0,6,0,0],
    [1,3,0,0,0,0,2,5,0],
    [0,0,0,0,0,0,0,7,4],
    [0,0,5,2,0,6,3,0,0]
  ];

  if (solveSudoku(grid) === true) {
    const startTime = performance.now();
    solveSudoku(grid)
    const endTime = performance.now();
    console.log('It took ' + (endTime - startTime) + ' ms.');
    document.getElementById('result').textContent = 'It took ' + (endTime - startTime) + ' ms. (result in console (F12))';

    printGrid(grid);
  } else {
    console.log('no solution');
  }
};

document.addEventListener('DOMContentLoaded', function() { 
  document.getElementById('buttonOne').addEventListener('click', main);
});
