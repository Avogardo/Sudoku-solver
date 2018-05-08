class JumpingStudent {
  constructor(grid) {
    this.grid = grid[0];

    this.showGrid(this.grid);
  }

  showGrid(grid) {
    console.log(grid);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log(DATA);

    const jumpingStudent = new JumpingStudent(DATA);
});
