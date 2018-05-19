N = 9;
result = [];
crookCounter = 0;

const read = grid => {
  const state = clone(grid);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = state[i][j];
      if (cell === 0) {
        state[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }

  return state;
};

const done = state => {
  for (let row of state) {
    for (let cell of row) {
      if (cell.length) {
        return false;
      }
    }
  }
  return true
};

const propagate_step = state => {
  let new_units = false;

  for (let i = 0; i < 9; i++) {
    const row = state[i];
    const values = row.filter(cell => !Array.isArray(cell));

    for (let j = 0; j < 9; j++) {
      if (Array.isArray(state[i][j])) {
        state[i][j] = arrays_subtraction(state[i][j], values);
        crookCounter++;
        if (state[i][j].length === 1) {
          state[i][j] = state[i][j].pop();
          new_units = true;
        } else if (state[i][j].length === 0) {
          return {solvable: false, new_unit: false};
        }
      }
    }
  }

  for (let j = 0; j < 9; j++) {
    const column = [];
    for (let col = 0; col < 9; col++) {
      column.push(state[col][j]);
    }
    const values = column.filter(cell => Array.isArray(cell));

    for (let i = 0; i < 9; i++) {
      if (Array.isArray(state[i][j])) {
        state[i][j] = arrays_subtraction(state[i][j], values);
        crookCounter++;
        if (state[i][j].length === 1) {
          state[i][j] = state[i][j].pop();
          new_units = true;
        } else if (state[i][j].length === 0) {
          return {solvable: false, new_unit: false};
        }
      }
    }
  }

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      const values = [];

      for (let i = 3 * x; i < 3 * x + 3; i++) {
        for (let j = 3 * y; j < 3 * y + 3; j++) {
          const cell = state[i][j];

          if (!Array.isArray(cell)) {
            values.push(cell);
          }
        }
      }

      for (let i = 3 * x; i < 3 * x + 3; i++) {
        for (let j = 3 * y; j < 3 * y + 3; j++) {
          if (Array.isArray(state[i][j])) {
            state[i][j] = arrays_subtraction(state[i][j], values);
            crookCounter++;
            if (state[i][j].length === 1) {
              state[i][j] = state[i][j].pop();
              new_units = true;
            } else if (state[i][j].length === 0) {
              return {solvable: false, new_unit: false};
            }
          }
        }
      }
    }
  }

  return {solvable: true, new_unit: new_units};
};

const propagate = state => {
  while (true) {
    const { solvable, new_unit } = propagate_step(state);

    if (!solvable) {
      return false;
    }
    if (!new_unit) {
      result = clone(state);
      console.log(1, state);
      return true;
    }
  }
};

const solve = state => {
  const solvable = propagate(state);
  if (!solvable) {
    return false;
  }

  if (done(state)) {
    return state;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = state[i][j];

      if (cell.length) {
        for (let value of cell) {
          const new_state = clone(state);
          new_state[i][j] = value;
          const solved = solve(new_state);

          if (solved) {
            return solved;
          }
        }

        return false;
      }
    }
  }
};

const crook = (puzzle, numberOfSolve) => {
  allResults.crook.push('Crook');

  for (let i = 1; i <= numberOfSolve; i++) {
    let startTime = performance.now();
    const grid = clone(puzzle);

    if (i === numberOfSolve) {
        const state = read(grid);
        solve(state);
        const a = clone(state);
        console.log('fc', a)
    } else {
      const state = read(grid);
      solve(state);
    }

    let endTime = performance.now();
    allResults.crook.push(endTime - startTime);
  }
};
