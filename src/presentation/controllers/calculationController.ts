import { Request, Response } from 'express';

import { CalculationService } from '../../domain/services/calculationService';
import { CalculationDataConverter } from '../../data/converters/calculationConverter';

export async function getNumber(req: Request, res: Response) {
  const calculationService = req.app.get(
    'calculationService',
  ) as CalculationService;

  const number = await calculationService.getNumber();
  const resDto = CalculationDataConverter.toResDto(number);

  res.send(resDto);
}
