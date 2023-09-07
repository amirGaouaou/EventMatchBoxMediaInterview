interface AttendeesTableProps {
  attendees: Attendee[];
}

const AttendeesTable: React.FC<AttendeesTableProps> = ({ attendees }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{attendee.name}</td>
              <td>{attendee.email}</td>
              <td>{attendee.birthday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendeesTable;
