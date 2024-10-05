import { InMemoryCalculationRepositoryImpl } from '../../../data/repositoryImpls/inMemoryCalculationRepositoryImpl';

describe('Test InMemoryCalculationRepositoryImpl', () => {
  describe('Test getNumber', () => {
    test('calculationData를 반환해야한다.', async () => {
      // Given
      const expected = {
        number: 0,
        updatedAt: new Date(),
      };
      const inMemoryCalculationRepositoryImpl =
        new InMemoryCalculationRepositoryImpl();

      // When
      const actual = await inMemoryCalculationRepositoryImpl.getNumber();

      // Then
      expect(actual).toEqual(expected);
    });
  });

  describe('Test setNumber', () => {
    test('calculationData를 저장해야한다.', async () => {
      // Given
      const expected = {
        number: 1,
        updatedAt: new Date(),
      };
      const inMemoryCalculationRepositoryImpl =
        new InMemoryCalculationRepositoryImpl();

      // When
      vitest.spyOn(inMemoryCalculationRepositoryImpl, 'setNumber');
      await inMemoryCalculationRepositoryImpl.setNumber(expected);

      // Then
      expect(inMemoryCalculationRepositoryImpl.setNumber).toBeCalledWith(
        expected,
      );
    });
  });
});
