export type Event = {
  id: string; // UUID as string
  name: string;
  description: string;
  location: string;
  start_time: string; // Date string (ISO format)
  end_time: string; // Date string (ISO format)
  admins: string[]; // Array of admin user IDs (UUIDs)
};
