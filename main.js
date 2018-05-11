document.addEventListener('DOMContentLoaded', () => {
  printGrid(DATA[0], 'inputGrid');

  document.getElementById('buttonOne').addEventListener('click', () => {
    const sudokuCounterInputValue = Number(document.getElementById('sudoku-counter-input').value);
    const numberOfSolve =  sudokuCounterInputValue === 0 ? 1 : sudokuCounterInputValue;

    let grid = clone(DATA[0]);

    new JumpingStudent(grid, numberOfSolve);

    grid = clone(DATA[0]);

    const startTime = performance.now();
    main(grid, numberOfSolve);
    const endTime = performance.now();
    console.log('It took ' + (endTime - startTime) + ' ms.');
    // document.getElementById('result').textContent = 'It took ' + (endTime - startTime) + ' ms. (result in console (F12))';
    printGrid(grid, 'outputGrid');
  });
});
