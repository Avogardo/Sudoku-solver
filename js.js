class JumpingStudent {
  constructor(grid) {
    this.grid = grid[0];
    this.state = this.read(this.grid);

    this.propagate_step();
    this.firstStep();

    JumpingStudent.showGrid(this.state);
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

  firstStep() {
      const { state } = this;

      for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
              for (let i = 3 * x; i < 3 * x + 3; i++) {
                  for (let j = 3 * y; j < 3 * y + 3; j++) {
                      if (state[i][j].length) {
                          state[i][j] = state[i][j][0];
                      }
                  }
              }
          }
      }

      const isSolved = this.isSolved();
      console.log(isSolved);
  }

  isSolved() {
      const { state } = this;

      for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
              for (let i = 3 * x; i < 3 * x + 3; i++) {
                  for (let j = 3 * y; j < 3 * y + 3; j++) {
                      if (state[i][j].length) {
                          return false;
                      }
                  }
              }
          }
      }

      return true;
  }

  propagate_step() {
      const { state } = this;

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

document.addEventListener('DOMContentLoaded', function() {
    console.log(DATA[0]);

    new JumpingStudent(DATA);
});
