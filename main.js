document.addEventListener('DOMContentLoaded', () => {
  getPuzzles();

  document.getElementById('buttonOne').addEventListener('click', () => {
    if (!selectedPuzzle) {
      showToaster('error', 'No puzzle selected');
      return;
    }

    updateLoader(true);
    console.log('selectedPuzzle', selectedPuzzle);
    setTimeout(() => {
      const sudokuCounterInputValue = Number(document.getElementById('sudoku-counter-input').value);
      const numberOfSolve =  sudokuCounterInputValue === 0 ? 1 : sudokuCounterInputValue;

      try {
        new JumpingStudent(selectedPuzzle, numberOfSolve);

        const startTime = performance.now();
        main(selectedPuzzle, numberOfSolve);
        const endTime = performance.now();
        showGrid((endTime - startTime), 'back');

        const startTimeCrook = performance.now();
        crook(selectedPuzzle, numberOfSolve);
        const endTimeCrook = performance.now();
        showGrid((endTimeCrook - startTimeCrook), 'crook');

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

  document.getElementById('file').addEventListener('change', onChange);
});
