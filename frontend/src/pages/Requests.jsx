import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Requests = () => {
  const [bookings, setBookings] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch bookings and conflicts when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        const [bookingsResponse, conflictsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/booking', {
            headers: { 'x-auth-token': token },
          }),
          axios.get('http://localhost:5000/api/conflicts', {
            headers: { 'x-auth-token': token },
          }),
        ]);

        setBookings(bookingsResponse.data.bookings);
        setConflicts(conflictsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response ? err.response.data.msg : 'Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Bookings</h2>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {/* Display bookings */}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b">Event Name</th>
              <th className="px-4 py-2 text-left border-b">Event Date</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td className="px-4 py-2 border-b">{booking.eventName}</td>
                <td className="px-4 py-2 border-b">{new Date(booking.eventDate).toLocaleString()}</td>
                <td className="px-4 py-2 border-b">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Display conflicts */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conflicts</h2>

      {conflicts.length === 0 ? (
        <p>No conflicts found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b">Conflict ID</th>
              <th className="px-4 py-2 text-left border-b">Event Name</th>
              <th className="px-4 py-2 text-left border-b">Conflicting Event</th>
              <th className="px-4 py-2 text-left border-b">Conflict Time</th>
            </tr>
          </thead>
          <tbody>
            {conflicts.map((conflict) => (
              <tr key={conflict.ConflictID}>
                <td className="px-4 py-2 border-b">{conflict.ConflictID}</td>
                <td className="px-4 py-2 border-b">
                  {conflict.EventName} ({conflict.EventStartTime} - {conflict.EventEndTime})
                </td>
                <td className="px-4 py-2 border-b">
                  {conflict.ConflictingEventName} ({conflict.ConflictingEventStartTime} - {conflict.ConflictingEventEndTime})
                </td>
                <td className="px-4 py-2 border-b">
                  {new Date(conflict.Timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Requests;
