// Client -> Server
// Create Trip input data
export interface CreateTripDto {
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  members: string[];
  created_by: string;
}
