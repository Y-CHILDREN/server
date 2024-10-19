import { CalculationData } from '../entities/calculationData';
import { CalculationRepository } from '../repositories/calculationRepository';

export class CalculationService {
  constructor(private readonly calculationRepository: CalculationRepository) {}

  async getNumber(): Promise<CalculationData> {
    const number = await this.calculationRepository.getNumber();
    return number;
  }

  async plusOne(): Promise<CalculationData> {
    const number = await this.calculationRepository.getNumber();
    const newNumber = {
      number: number.number + 1,
      updatedAt: new Date(),
    };
    await this.calculationRepository.setNumber(newNumber);

    return newNumber;
  }

  async minusOne(): Promise<CalculationData> {
    const number = await this.calculationRepository.getNumber();
    const newNumber = {
      number: number.number - 1,
      updatedAt: new Date(),
    };
    await this.calculationRepository.setNumber(newNumber);

    return newNumber;
  }
}
