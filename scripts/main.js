const allResults = {
  jumping: [],
  backtracking: [],
  crook: [],
};

document.addEventListener('DOMContentLoaded', () => {
  getPuzzles();

  document.getElementById('buttonOne').addEventListener('click', () => {
    if (!selectedPuzzle) {
      showToaster('error', 'No puzzle selected');
      return;
    }

    allResults.crook = [];
    allResults.backtracking = [];
    allResults.jumping = [];

    updateLoader(true);
    console.log('selectedPuzzle', selectedPuzzle);
    setTimeout(() => {
      const sudokuCounterInputValue = Number(document.getElementById('sudoku-counter-input').value);
      const numberOfSolve =  sudokuCounterInputValue === 0 ? 1 : sudokuCounterInputValue;

      try {
        const a = new JumpingStudent(selectedPuzzle, numberOfSolve);
        allResults.jumping = a.arrayOfResults;

        const startTime = performance.now();
        main(selectedPuzzle, numberOfSolve);
        const endTime = performance.now();
        showGrid((endTime - startTime), 'back', backTrackingCounter, backTrackingCounter);

        const startTimeCrook = performance.now();
        crook(selectedPuzzle, numberOfSolve);
        const endTimeCrook = performance.now();
        showGrid((endTimeCrook - startTimeCrook), 'crook', crookCounter, crookCounter);

        updateLoader();
        document.querySelector('.results').style.display = 'block';
        console.log(crookCounter);
        clearCounters();
        printChart();
        showToaster('success', 'Succeed');
      } catch (error) {
        console.log(error);
        updateLoader();
        showToaster('error', error);
      }
    }, 30);
  });

  document.getElementById('file').addEventListener('change', onChange);

  document.getElementById('export-button').addEventListener('click', () => exportToCsv(allResults));
});
