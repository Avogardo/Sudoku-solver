describe('Testing helper functionality', () => {
  const testDomElement = document.createElement('div');

  beforeEach(() => {
    document.querySelector('body').appendChild(testDomElement);
  });

  afterEach(() => {
    document.querySelector('body').removeChild(testDomElement);
  });

  it('should clone and return array or object', () => {
    const array = [1, 2, 3];
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(clone(array)).toEqual([1, 2, 3]);
    expect(clone(object)).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });

  it('should subtract arrays', () => {
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [3, 5];

    expect(arrays_subtraction(array1, array2)).toEqual([1, 2, 4]);
  });

  it('should show or hide loader', () => {
    testDomElement.className = "loader-wrapper";

    updateLoader(true);
    expect(testDomElement.style.zIndex).toBe('10');
    expect(testDomElement.style.opacity).toBe('1');
    updateLoader();
    expect(testDomElement.style.zIndex).toBe('-1');
    expect(testDomElement.style.opacity).toBe('0');
  });

  it('should show info and result of algorithm', () => {
    const cases = [{
        elementId: 'result',
        switchCase: 'jump',
      }, {
        elementId: 'result-backtracking',
        switchCase: 'back',
      }, {
        elementId: 'result-crook',
        switchCase: 'crook',
    }];

    cases.forEach(oneCase => {
      testDomElement.id = oneCase.elementId;
      showGrid(3, oneCase.switchCase, null, 5, 2);

      expect(testDomElement.textContent).toContain(1.5);
      expect(testDomElement.textContent).toContain(2.5);

      testDomElement.textContent = '';
    });
  });

  it('should show info and result of algorithm', () => {
    jasmine.clock().install();

    testDomElement.className = "toaster";

    showToaster('success', 'message');
    expect(testDomElement.style.backgroundColor).toBe('rgb(76, 174, 76)');
    expect(testDomElement.style.top).toBe('12px');
    expect(testDomElement.style.opacity).toBe('1');
    expect(testDomElement.textContent).toContain('message');

    jasmine.clock().tick(3000);
    expect(testDomElement.style.top).toBe('-60px');
    expect(testDomElement.style.opacity).toBe('0');

    showToaster('error', 'message');
    expect(testDomElement.style.backgroundColor).toBe('rgb(217, 83, 79)');

    jasmine.clock().tick(3500);
    expect(testDomElement.style.top).toBe('-60px');
    expect(testDomElement.style.opacity).toBe('0');

    jasmine.clock().uninstall();
  });

  it('should get and display data from database', () => {
    expect(Array.isArray(DATA)).toBe(true);

    testDomElement.className = 'dropdown-content';
    getPuzzles();

    expect(testDomElement.querySelectorAll('li').length).toBe(DATA.length);
  });

  it('should set puzzle from database and display it', () => {
    testDomElement.id = 'inputGrid';
    const container = document.createElement('div');
    container.className = 'sudoku-container';
    document.querySelector('body').appendChild(container);

    setPuzzle(null, '1');
    expect(selectedPuzzle).toEqual(DATA[1]);
    expect(testDomElement.textContent.length).toBe(278);
    document.querySelector('body').removeChild(container);
    });

  it('should create download element', () => {
    const allResults = {
      jumping: [],
      backtracking: [],
      crook: [],
    };

    testDomElement.className = "toaster";
    exportToCsv(allResults);
    const a = document.querySelectorAll('a');
    expect(a.length).toBe(2);
  });

  it('should clear counters', () => {
    expect(crookCounter).toBe(0);
    expect(backTrackingCounter).toBe(0);
  });
});
