// Client -> Server
// Create Trip input data
export interface CreateTripDto {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  members: string[];
}
