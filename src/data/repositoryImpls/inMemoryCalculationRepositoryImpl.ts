import { CalculationData } from '../../domain/entities/calculationData';
import { CalculationRepository } from '../../domain/repositories/calculationRepository';

export class InMemoryCalculationRepositoryImpl
  implements CalculationRepository
{
  private calculationData: CalculationData = {
    number: 0,
    updatedAt: new Date(),
  };

  async getNumber() {
    return this.calculationData;
  }

  async setNumber(value: CalculationData) {
    this.calculationData = value;
  }
}
