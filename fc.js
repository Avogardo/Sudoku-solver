N = 9;
grid = [
  [5,1,7,6,0,0,0,3,4],
  [2,8,9,0,0,4,0,0,0],
  [3,4,6,2,0,5,0,9,0],
  [6,0,2,0,0,0,0,1,0],
  [0,3,8,0,0,6,0,4,7],
  [0,0,0,0,0,0,0,0,0],
  [0,9,0,0,0,0,0,7,8],
  [7,0,3,4,0,0,5,6,0],
  [0,0,0,0,0,0,0,0,0],
];

const print_grid = grid => {
  if (!grid) {
    console.log('no solution');
    return;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = grid[i][j];

      if (cell === 0 || cell.length) {
        console.log('.');
      } else {
        console.log(cell);
      }

      if ((j + 1) % 3 === 0 && j < 8) {
        console.log('|');
      }

      if (j !== 0) {
        console.log(' ');
      }
    }

    console.log('\n');
    if ((i + 1) % 3 === 0 && i < 8) {
      console.log("- - - + - - - + - - -\n");
    }
  }
};

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
  for (let row in state) {
    for (let cell in row) {
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
    const values = row.filter(cell => !cell.length);

    for (let j = 0; j < 9; j++) {
      if (state[i][j].length) {
        state[i][j] = a_diff(state[i][j], values);
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
    const values = column.filter(cell => !cell.length);

    for (let i = 0; i < 9; i++) {
      if (state[i][j].length) {
        state[i][j] = a_diff(state[i][j], values);

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

          if (!cell.length) {
            values.push(cell);
          }
        }
      }

      for (let i = 3 * x; i < 3 * x + 3; i++) {
        for (let j = 3 * y; j < 3 * y + 3; j++) {
          if (state[i][j].length) {
            state[i][j] = a_diff(state[i][j], values);

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
console.log(state[0][4]);
  return {solvable: true, new_unit: new_units};
};

const propagate = state => {
  while (true) {
    const { solvable, new_unit } = propagate_step(state);
    console.log(solvable, new_unit, i);
    if (!solvable) {
      console.log(1);
      return false;
    }
    if (!new_unit) {
      console.log(2);
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
        for (let value in cell) {
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

const clone = existingArray => {
   let newObj = (existingArray instanceof Array) ? [] : {};
   for (i in existingArray) {
      if (i == 'clone') continue;
      if (existingArray[i] && typeof existingArray[i] == "object") {
         newObj[i] = clone(existingArray[i]);
      } else {
         newObj[i] = existingArray[i]
      }
   }
   return newObj;
};

const a_diff = (a1, a2) => {
    const newArray = [];

    a1.forEach(element => {
      const areBoth = a2.find(element2 => element2 === element);

      if (!areBoth) {
        newArray.push(element);
      }
    });

    return newArray;
};

const main = () => {
  const state = read(grid);
  console.log(state);
  print_grid(solve(state));
};

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('buttonOne').addEventListener('click', main);
});
