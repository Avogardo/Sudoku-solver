class JumpingStudent {
  constructor(grid, numberOfSolve) {
    this.grid = grid;
    this.numberOfSolve = numberOfSolve;
    this.result = [];
    this.arrayOfResults = ['Jumping Student'];
    this.counter = 0;

    const startTime = performance.now();
    for (let i = 1; i <= this.numberOfSolve; i++) {
      let startTime = performance.now();
      if (i === this.numberOfSolve) {
        this.result = this.read(this.grid);
      } else {
        this.read(this.grid);
      }
      let endTime = performance.now();
      this.arrayOfResults.push(endTime - startTime);
    }
    const endTime = performance.now();

    printGrid(this.result, 'result-jumping-student-grid');
    showGrid((endTime - startTime), 'jump', this.result, this.counter, this.counter);
  }

  read(grid) {
    const state = clone(grid);

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = state[i][j];
        if (cell === 0) {
          state[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
      }
    }

    return this.propagate_step(state);
  }

  solveSudoku(state) {
    const l = [0, 0, 0, 0];
    const stateCopy = clone(state);

    if (!JumpingStudent.findUnassignedLocation(state, l)) {
      return true;
    }

    const row = l[0];
    const col = l[1];

    for (let num of stateCopy[row][col]) {
      if (JumpingStudent.isSafe(state, row, col, num)) {
        state[row][col] = num;
        this.counter++;
        if (this.solveSudoku(state)) {
          return state;
        }

        state[row][col] = stateCopy[row][col];
      }
    }

    return false;
  }

  propagate_step(state) {
    for (let i = 0; i < 9; i++) {
      const row = state[i];
      const values = row.filter(cell => !cell.length);

      for (let j = 0; j < 9; j++) {
        if (typeof state[i][j] === "string") {
          state[i][j] = Number(state[i][j])
        }
        if (state[i][j].length) {
          this.counter++;
          state[i][j] = arrays_subtraction(state[i][j], values);
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
          this.counter++;
          state[i][j] = arrays_subtraction(state[i][j], values);
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
              this.counter++;
              state[i][j] = arrays_subtraction(state[i][j], values);
            }
          }
        }
      }
    }

    return this.solveSudoku(state);
  }

  static findUnassignedLocation(grid, l) {
    let square = [];

    if (l[2] > 2) {
      l[2] = 0;
      l[3] = l[3] + 1;
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
          l[2] = x + 1;
          square = [];
          return true;
        }

        square = [];
      }
    }

    return false;
  }

  static usedInRow(grid, row, num) {
    for (let col = 0; col < 9; col++) {
      if (!Array.isArray(grid[row][col]) && grid[row][col] === num) {
        return true;
      }
    }

    return false;
  }

  static usedInCol(grid, col, num) {
    for (let row = 0; row < 9; row++) {
      if (!Array.isArray(grid[row][col]) && grid[row][col] === num) {
        return true;
      }
    }

    return false;
  }

  static usedInBox(grid, boxStartRow, boxStartCol, num) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (
          !Array.isArray(grid[row + boxStartRow][col + boxStartCol]) &&
          grid[row + boxStartRow][col + boxStartCol] === num
        ) {
          return true;
        }
      }
    }

    return false;
  }

  static isSafe(grid, row, col, num) {
    return !JumpingStudent.usedInRow(grid, row, num) &&
      !JumpingStudent.usedInCol(grid, col, num) &&
      !JumpingStudent.usedInBox(grid, row - row % 3, col - col % 3, num);
  }
}
