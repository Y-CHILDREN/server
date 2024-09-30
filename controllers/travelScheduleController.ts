import { Request, Response } from "express";
import { PrismaTravelScheduleRepository } from "../repository/PrismaTravelScheduleRepository";
import { CreateTravelSchedule } from "../useCases/createTravelSchedule";


const travelScheduleRepository = new PrismaTravelScheduleRepository();
const createTravelSchedule = new CreateTravelSchedule(travelScheduleRepository);

export class travelScheduleController {
    static async create(req: Request, res: Response) {
        const { name, startDate, endDate, memberNicknames } = req.body;

        try {
            const travelSchedule = await createTravelSchedule.execute({
                name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                memberNicknames,
            });
            res.status(201).json(travelSchedule);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}