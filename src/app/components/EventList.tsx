import EventCard from "./EventCard";

interface EventListProps {
  events: MatchboxEvent[];
  userType: GroupType;
}

const EventList: React.FC<EventListProps> = ({ events, userType }) => {
  return (
    <div className="carousel rounded-box p-20 space-x-20 overflow-x-auto">
      {events
        .filter((event) => {
          if (userType === "Guest") {
            return event.visibility === "public";
          } else {
            return true;
          }
        })
        .map((event, index) => (
          <div className="carousel-item rounded-box">
            <EventCard key={index} event={event} id={index} />
          </div>
        ))}
    </div>
  );
};
export default EventList;
