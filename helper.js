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

const showGrid = (runTime, algorithm, grid) => {
  console.log(grid);

  switch (algorithm) {
    case 'jump':
      document.getElementById('result').textContent = `${runTime}`;
      break;
    case 'back':
      document.getElementById('result-backtracking').textContent = `${runTime}`;
      break;
    default:
        break;
  }

};

const printGrid = (grid, elementId) => {
  let table = '';
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      table += `${grid[row][col]} `;
    }
    table += '<br>';
  }

  document.getElementById(elementId).innerHTML = table;
  console.log(grid);
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
    }, 2500);
};
