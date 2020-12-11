import parseStringToDate from '../../src/utils/parseStringToDate';

describe('parse String To Date', () => {
  it('should parse a string to Date object', () => {
    expect(parseStringToDate('29/09/2019')).toBeInstanceOf(Date);
  });
});
