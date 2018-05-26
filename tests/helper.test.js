describe('Testing helper functionality', () => {
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
  })
});
