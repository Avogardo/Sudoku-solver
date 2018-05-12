document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('buttonOne').addEventListener('click', () => {
    updateLoader(true);

    setTimeout(() => {
      const sudokuCounterInputValue = Number(document.getElementById('sudoku-counter-input').value);
      const numberOfSolve =  sudokuCounterInputValue === 0 ? 1 : sudokuCounterInputValue;

      new JumpingStudent(DATA[0], numberOfSolve);

      const startTime = performance.now();
      main(DATA[0], numberOfSolve);
      const endTime = performance.now();
      console.log('Backtracking took ' + (endTime - startTime) + ' ms.');

      updateLoader();

      showToaster('success', 'Success');
    }, 30);
  });
});
