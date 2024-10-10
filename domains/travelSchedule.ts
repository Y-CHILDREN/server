export class TravelSchedule {
    constructor(
        public id: number,
        public name: string,
        public startDate: Date,
        public endDate: Date,
        public members: string[]

    ) {}

    // 날짜 유효성 검사.
    isValidPeriod(): boolean {
        return this.startDate < this.endDate;
    }
}