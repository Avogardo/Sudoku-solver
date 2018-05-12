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

const showGrid = (grid, runTime) => {
  console.log(grid);
  document.getElementById('result').textContent = `${runTime}`;
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