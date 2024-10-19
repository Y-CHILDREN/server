import { CalculationData } from '../../domain/entities/calculationData';

export class CalculationDataConverter {
  static toResDto(source: CalculationData) {
    return { n: source.number };
  }
}
