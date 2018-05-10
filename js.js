class JumpingStudent {
  constructor(grid) {
    this.grid = grid[0];
    this.state = this.read(this.grid);

    this.propagate_step();
    const result = this.solveSudoku();

    JumpingStudent.showGrid(result);
  }

  read(grid) {
    const state = this.clone(grid);

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = state[i][j];
        if (cell === 0) {
          state[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
      }
    }

    return state;
  }

  solveSudoku() {
    const {state} = this;
    const l = [0, 0, 0, 0];
    const stateCopy = this.clone(state);

    if (!this.findUnassignedLocation(state, l)) {
      return true;
    }

    const row = l[0];
    const col = l[1];

    for (let num of stateCopy[row][col]) {
      if (this.isSafe(state, row, col, num)) {
        state[row][col] = num;

        if (this.solveSudoku(state)) {
          return state;
        }

        state[row][col] = stateCopy[row][col];
      }
    }

    return false;
  }

  findUnassignedLocation(grid, l) {
    let square = [];

    if (l[2] > 2) {
      l[2] = 0;
    }

    if (l[3] > 2) {
      l[3] = 0;
    }

    for (let x = l[2]; x < 3; x++) {
      for (let y = l[3]; y < 3; y++) {
        for (let i = 3 * x; i < 3 * x + 3; i++) {
          for (let j = 3 * y; j < 3 * y + 3; j++) {
            if (Array.isArray(grid[i][j])) {
              square.push({state: grid[i][j], i, j, x, y});
            }
          }
        }

        if (square.length) {
          const shortest = square[square
            .map(a => a.state.length)
            .indexOf(Math.min.apply(Math, square.map(a => a.state.length)))];

          l[0] = shortest.i;
          l[1] = shortest.j;
          l[3] = x + 1;
          l[4] = y + 1;
          square = [];
          return true;
        }

        square = [];
      }
    }

    return false;
  }

  usedInRow(grid, row, num) {
    for (let col = 0; col < 9; col++) {
      if (!Array.isArray(grid[row][col]) && grid[row][col] === num) {
        return true;
      }
    }

    return false;
  }

  usedInCol(grid, col, num) {
    for (let row = 0; row < 9; row++) {
      if (!Array.isArray(grid[row][col]) && grid[row][col] === num) {
        return true;
      }
    }

    return false;
  }

  usedInBox(grid, boxStartRow, boxStartCol, num) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (
          !Array.isArray(grid[row + boxStartRow][col + boxStartCol]) &&
          grid[row + boxStartRow][col + boxStartCol] === num === num
        ) {
          return true;
        }
      }
    }

    return false;
  }

  isSafe(grid, row, col, num) {
    return !this.usedInRow(grid, row, num) &&
      !this.usedInCol(grid, col, num) &&
      !this.usedInBox(grid, row - row % 3, col - col % 3, num);
  }

  propagate_step() {
    const {state} = this;

    for (let i = 0; i < 9; i++) {
      const row = state[i];
      const values = row.filter(cell => !cell.length);

      for (let j = 0; j < 9; j++) {
        if (typeof state[i][j] === "string") {
          state[i][j] = Number(state[i][j])
        }
        if (state[i][j].length) {
          state[i][j] = this.arrays_subtraction(state[i][j], values);
        }
      }
    }

    for (let j = 0; j < 9; j++) {
      const column = [];
      for (let col = 0; col < 9; col++) {
        column.push(state[col][j]);
      }
      const values = column.filter(cell => !cell.length);

      for (let i = 0; i < 9; i++) {
        if (state[i][j].length) {
          state[i][j] = this.arrays_subtraction(state[i][j], values);
        }
      }
    }

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const values = [];

        for (let i = 3 * x; i < 3 * x + 3; i++) {
          for (let j = 3 * y; j < 3 * y + 3; j++) {
            const cell = state[i][j];

            if (!cell.length) {
              values.push(cell);
            }
          }
        }

        for (let i = 3 * x; i < 3 * x + 3; i++) {
          for (let j = 3 * y; j < 3 * y + 3; j++) {
            if (state[i][j].length) {
              state[i][j] = this.arrays_subtraction(state[i][j], values);
            }
          }
        }
      }
    }
  }

  clone(existingArray) {
    let newObj = (existingArray instanceof Array) ? [] : {};
    for (let i in existingArray) {
      if (i === 'clone') continue;
      if (existingArray[i] && typeof existingArray[i] === "object") {
        newObj[i] = this.clone(existingArray[i]);
      } else {
        newObj[i] = existingArray[i]
      }
    }

    return newObj;
  }

  arrays_subtraction(array1, array2) {
    const newArray = [];

    array1.forEach(element => {
      const areBoth = array2.find(element2 => element2 === element);

      if (!areBoth) {
        newArray.push(element);
      }
    });

    return newArray;
  }

  static showGrid(grid) {
    console.log(grid);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  console.log(DATA[0]);

  new JumpingStudent(DATA);
});
