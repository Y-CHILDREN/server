export interface CalculationRepository {
  getNumber(): Promise<number>;
  setNumber(value: number): Promise<void>;
}
