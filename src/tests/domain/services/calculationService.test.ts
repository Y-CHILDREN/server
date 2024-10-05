import { CalculationService } from '../../../domain/services/calculationService';

describe('Test CalculationService', () => {
  describe('Test CalculationService.getNumber', () => {
    test('repository에서 주는 number를 그대로 반환해야한다.', async () => {
      // Given
      const expected = 1;
      const calculationRepository = {
        getNumber: async () => expected,
      } as any;
      const calculationService = new CalculationService(calculationRepository);

      // When
      const actual = await calculationService.getNumber();

      // Then
      expect(actual).toEqual(expected);
    });
  });

  describe('Test CalculationService.plusOne', () => {
    test('repository에 있는 number에 1을 더한 값을 repository에 저장하고, 그 값을 반환해야한다.', async () => {
      // Given
      const expected = 2;
      const calculationRepository = {
        getNumber: async () => 1,
        setNumber: async () => {},
      } as any;
      const calculationService = new CalculationService(calculationRepository);

      // When
      vitest.spyOn(calculationRepository, 'setNumber');
      const actual = await calculationService.plusOne();

      // Then
      expect(calculationRepository.setNumber).toBeCalledWith(expected);
      expect(actual).toEqual(expected);
    });
  });

  describe('Test CalculationService.minusOne', () => {
    test('repository에 있는 number에 1을 뺀 값을 repository에 저장하고, 그 값을 반환해야한다.', async () => {
      // Given
      const expected = 0;
      const calculationRepository = {
        getNumber: async () => 1,
        setNumber: async () => {},
      } as any;
      const calculationService = new CalculationService(calculationRepository);

      // When
      vitest.spyOn(calculationRepository, 'setNumber');
      const actual = await calculationService.minusOne();

      // Then
      expect(calculationRepository.setNumber).toBeCalledWith(expected);
      expect(actual).toEqual(expected);
    });
  });
});
