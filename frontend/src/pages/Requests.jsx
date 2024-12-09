import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Requests = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.get('/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the request header
          },
        });

        setBookings(response.data.bookings);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.response ? err.response.data.msg : 'Error fetching bookings');
      }
    };

    //fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Bookings</h2>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
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
    </div>
  );
};

export default Requests;
