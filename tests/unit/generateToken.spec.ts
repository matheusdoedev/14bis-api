import generateToken from '../../src/utils/generateToken';

describe('Authentication token generator', () => {
  it('should return token for valid params', () => {
    const token = generateToken({ id: 1 });

    expect(token).toBeTruthy();
  });
});
