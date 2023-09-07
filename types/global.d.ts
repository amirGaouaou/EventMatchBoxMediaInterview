export {};

declare global {
  type MatchboxEvent = {
    id: number;
    name: string;
    banner: string;
    visibility: string;
    attendees: Attendee[];
  };

  type Attendee = {
    name: string;
    email: string;
    birthday: string;
  };

  type Data = {
    events: MatchboxEvent[];
  };

  type Visibility = "public" | "private";

  type GroupType = "Admin" | "Guest";
}
