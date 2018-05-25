let selectedPuzzle;

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

const arrays_subtraction = (array1, array2) => {
  const newArray = [];

  array1.forEach(element => {
    const areBoth = array2.find(element2 => element2 === element);

    if (!areBoth) {
      newArray.push(element);
    }
  });

  return newArray;
};

const updateLoader = isWorking => {
  document.querySelector('.loader-wrapper').style.zIndex = isWorking ? 10 : -1;
  document.querySelector('.loader-wrapper').style.opacity = isWorking ? 1 : 0;
};

const showGrid = (runTime, algorithm, grid, insertions) => {
  console.log(algorithm, grid);

  switch (algorithm) {
    case 'jump':
      document.getElementById('result').textContent = `It took ${runTime}ms. Insertions: ${insertions}`;
      break;
    case 'back':
      document.getElementById('result-backtracking').textContent = `It took ${runTime}ms. Insertions: ${insertions}`;
      break;
    case 'crook':
      document.getElementById('result-crook').textContent = `It took ${runTime}ms. Insertions: ${insertions}`;
      break;
    default:
        break;
  }
};

const printGrid = (grid, elementId) => {
  let table = '';
  let cell;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cell = grid[row][col];
      if ((cell === 0 || Array.isArray(cell)) && !((col + 1) % 3 === 0 && col < 8)) {
        table += ' 0 ';
      } else {
        table += cell;
        if ((col + 1) % 3 === 0 && col < 8) {
          table += ' |';
        }

        if (col !== 8) {
          table +=  ' ';
        }
      }

    }

    table += '<br>';
    if ((row + 1) % 3 === 0 && row < 8) {
      table += "- - - + - - - + - - -<br>"
    }
  }

  document.getElementById(elementId).innerHTML = table;
};

const showToaster = (type, message) => {
  const toaster = document.querySelector('.toaster');
  toaster.style.backgroundColor = type === 'success' ? '#4cae4c' : '#d9534f';
  toaster.textContent = message;
  toaster.style.top = '12px';
  toaster.style.opacity = '1';

  setTimeout(() => {
    toaster.style.top = '-60px';
    toaster.style.opacity = '0';
    }, type === 'success' ? 3000 : 3500);
};

const onChange = (event) => {
  const reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);
};

onReaderLoad = (event) => {
  const obj = JSON.parse(event.target.result);
  console.log(obj.grid);

  const json = require('./data.json');
  console.log(json);
};

const getPuzzles = () => {
  const puzzles = DATA;

  let puzzleList = "";
  puzzles.forEach((puzzle, index) => {
    puzzleList += `<li onclick="setPuzzle(this, '${index}')">Puzzle ${ index + 1 }</li>`;
  });

  document.querySelector('.dropdown-content').innerHTML = puzzleList;
};

const setPuzzle = (element, index) => {
  selectedPuzzle = DATA[Number(index)];
  printGrid(selectedPuzzle, 'inputGrid');
};

const exportToCsv = () => {
  try {
    let Results = [
      allResults.jumping,
      allResults.backtracking,
      allResults.crook,
    ];

    Results = Results[0].map((col, i) => Results.map(row => row[i]));

    let CsvString = '"sep=,"\r\n';
    Results.forEach((RowItem) => {
      RowItem.forEach((ColItem) => {
        CsvString += ColItem + ',';
      });
      CsvString += "\r\n";
    });

    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    const x = document.createElement("A");
    x.setAttribute("href", CsvString );
    x.setAttribute("download","sudoku results.csv");
    document.body.appendChild(x);
    x.click();

    showToaster('success', 'Export succeed');
  } catch (error) {
    console.log(error);
    showToaster('error', error);
  }
};

const clearCounters = () => {
  crookCounter = 0;
  backTrackingCounter = 0;
};

const printChart = () => {
  const results = clone([
    allResults.jumping,
    allResults.backtracking,
    allResults.crook,
  ]);

  const labels = results.map(result => result[0]);

  results.forEach(result => result.shift());
  const data = [
    results[0].reduce((a, b) => a + b, 0).toFixed(2),
    results[1].reduce((a, b) => a + b, 0).toFixed(2),
    results[2].reduce((a, b) => a + b, 0).toFixed(2),
  ];

  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Result [ms]',
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });
};
