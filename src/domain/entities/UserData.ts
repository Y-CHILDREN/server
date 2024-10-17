import internal from 'stream';

export interface UserData {
  id: number;
  email: string;
  name: string;
  tripSchedule: number[];
  createdAt: Date;
  updatedAt: Date;
}
