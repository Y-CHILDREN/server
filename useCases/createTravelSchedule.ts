import { TravelSchedule } from '../domains/travelSchedule'
import { ITravelScheduleRepository } from '../repository/travelScheduleRepository'

export class CreateTravelSchedule {
    constructor(private travelScheduleRepository: ITravelScheduleRepository) {};

    async execute(data: {
        name: string;
        startDate: Date;
        endDate: Date;
        memberNicknames: string[];
    }): Promise<TravelSchedule> {
        const travelSchedule = new TravelSchedule(
            0,
            data.name,
            data.startDate,
            data.endDate,
            data.memberNicknames
        );

        if (!travelSchedule.isValidPeriod()) {
            throw new Error("Invalid period");
        }

        return this.travelScheduleRepository.create(travelSchedule);
    }
}