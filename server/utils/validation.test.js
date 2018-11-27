const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealStirng', () => {
  it('should reject non-string values', () => {
    expect(isRealString(4567)).toBe(false);
  });

  it('should reject a string of only whitespace', () => {
    expect(isRealString("     ")).toBe(false);
  });

  it('should allow a string with non space characters', () => {
    expect(isRealString("   abldkeff  ")).toBe(true);
  });
});