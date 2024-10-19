import { CalculationDataConverter } from '../../../data/converters/calculationConverter';
import { CalculationData } from '../../../domain/entities/calculationData';

describe('Test CalculationDataConverter', () => {
  describe('Test CalculationDataConverter.toResDto', () => {
    test('CalculationData를 CalculationDataResponseDTO 변환해야한다.', () => {
      // Given
      const source: CalculationData = {
        number: 1,
        updatedAt: new Date(),
      };
      const expected = { n: 1 };
      const actual = CalculationDataConverter.toResDto(source);

      // Then
      expect(actual).toEqual(expected);
    });
  });
});
