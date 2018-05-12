document.addEventListener('DOMContentLoaded', () => {
  printGrid(DATA[0], 'inputGrid');
  document.getElementById('buttonOne').addEventListener('click', () => {
    updateLoader(true);

    setTimeout(() => {
      const sudokuCounterInputValue = Number(document.getElementById('sudoku-counter-input').value);
      const numberOfSolve =  sudokuCounterInputValue === 0 ? 1 : sudokuCounterInputValue;

      try {
        new JumpingStudent(DATA[0], numberOfSolve);

        const startTime = performance.now();
        main(DATA[0], numberOfSolve);
        const endTime = performance.now();
        showGrid((endTime - startTime), 'back');
        console.log('Backtracking took ' + (endTime - startTime) + ' ms.');

        updateLoader();

        document.querySelector('.results').style.display = 'block';

        showToaster('success', 'Success');
      } catch (error) {
        console.log(error);
        updateLoader();
        showToaster('error', error);
      }
    }, 30);
  });
});
