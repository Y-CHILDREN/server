import { CalculationRepository } from '../repositories/calculationRepository';

export class CalculationService {
  constructor(private readonly calculationRepository: CalculationRepository) {}

  async getNumber(): Promise<number> {
    const number = await this.calculationRepository.getNumber();
    return number;
  }

  async plusOne(): Promise<number> {
    const number = await this.calculationRepository.getNumber();
    const newNumber = number + 1;
    await this.calculationRepository.setNumber(newNumber);

    return newNumber;
  }

  async minusOne(): Promise<number> {
    const number = await this.calculationRepository.getNumber();
    const newNumber = number - 1;
    await this.calculationRepository.setNumber(newNumber);

    return newNumber;
  }
}
