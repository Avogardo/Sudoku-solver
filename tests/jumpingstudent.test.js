describe('Testing helper functionality', () => {
  const testDomElement = document.createElement('div');

  const result = document.createElement('div');
  const result2 = document.createElement('div');
  result.id = 'result-jumping-student-grid';
  result2.id = 'result';
  let jumpingStudent;
  const container = document.createElement('div');
  container.className = 'sudoku-container';

  beforeEach(() => {
    document.querySelector('body').appendChild(container);
    document.querySelector('body').appendChild(result);
    document.querySelector('body').appendChild(result2);
    jumpingStudent = new JumpingStudent(DATA[0], 1);
    document.querySelector('body').appendChild(testDomElement);
  });

  afterEach(() => {
    document.querySelector('body').removeChild(testDomElement);
    document.querySelector('body').removeChild(result);
    document.querySelector('body').removeChild(result2);
    document.querySelector('body').removeChild(container);
  });

  it('read should call propagate_step', () => {
    spyOn(jumpingStudent, 'propagate_step');
    jumpingStudent.read(DATA[0]);
    expect(jumpingStudent.propagate_step).toHaveBeenCalled();
  });
});
