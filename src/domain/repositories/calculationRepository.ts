import { CalculationData } from '../entities/calculationData';

export interface CalculationRepository {
  getNumber(): Promise<CalculationData>;
  setNumber(value: CalculationData): Promise<void>;
}
