import { PrismaClient } from "prisma/prisma-client/scripts/default-index";
import { ITravelScheduleRepository } from "./travelScheduleRepository";
import { TravelSchedule } from "../domains/travelSchedule";

const prisma = new PrismaClient();

export class PrismaTravelScheduleRepository implements ITravelScheduleRepository {
    async create(travelSchedule:TravelSchedule): Promise<TravelSchedule> {
        const createdTravelSchedule = await prisma.travelSchedule.create({
            date: {
                name: travelSchedule.name,
                startDate: travelSchedule.startDate,
                endDate: travelSchedule.endDate,
                members: {
                    connect: travelSchedule.members.map((nickName) => nickName),
                },
            },
        });

        return new TravelSchedule(
            createdTravelSchedule.id,
            createdTravelSchedule.name,
            createdTravelSchedule.startDate,
            createdTravelSchedule.endDate,
            travelSchedule.members
        );
    }

    // async findByNickname(nickname: string): Promise<TravelSchedule[]> {
    //
    // }
}