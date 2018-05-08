class JumpingStudent {
  constructor(grid) {
    this.grid = grid[0];
    this.puzzle = this.read(this.grid);

    this.showGrid(this.puzzle);
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

  clone(existingArray) {
    let newObj = (existingArray instanceof Array) ? [] : {};
      for (let i in existingArray) {
        if (i == 'clone') continue;
          if (existingArray[i] && typeof existingArray[i] == "object") {
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

  showGrid(grid) {
    console.log(grid);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log(DATA);

    const jumpingStudent = new JumpingStudent(DATA);
});
