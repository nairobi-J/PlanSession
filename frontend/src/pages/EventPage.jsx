import React, { useEffect, useState } from "react";
import axios from "axios";

const EventPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [startTimeFilter, setStartTimeFilter] = useState({ start: "", end: "" });
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/events");

        const formattedData = data.map((meeting) => ({
          id: meeting.id,
          title: meeting.name,
          date: meeting.date.split("T")[0],
          time: `${meeting.startTime} - ${meeting.endTime}`,
          location: meeting.location,
          day: meeting.day,
          duration: meeting.duration,
          status: meeting.status || "Scheduled",
          start: meeting.startTime,
          end: meeting.endTime,
          userId: meeting.userId,
        }));

        setMeetings(formattedData);
        setFilteredMeetings(formattedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  // Filter function
  const applyFilters = () => {
    let filtered = [...meetings];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((meeting) =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((meeting) => meeting.status === statusFilter);
    }

    // Duration filter
    if (durationFilter) {
      filtered = filtered.filter((meeting) => {
        if (durationFilter === "short") return meeting.duration <= 30;
        if (durationFilter === "medium") return meeting.duration > 30 && meeting.duration <= 60;
        if (durationFilter === "long") return meeting.duration > 60;
        return true;
      });
    }

    // Start time filter
    if (startTimeFilter.start && startTimeFilter.end) {
      filtered = filtered.filter((meeting) => {
        const meetingStart = new Date(`1970-01-01T${meeting.start}`);
        const filterStart = new Date(`1970-01-01T${startTimeFilter.start}`);
        const filterEnd = new Date(`1970-01-01T${startTimeFilter.end}`);
        return meetingStart >= filterStart && meetingStart <= filterEnd;
      });
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter((meeting) => meeting.date === dateFilter);
    }

    setFilteredMeetings(filtered);
  };

  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, statusFilter, durationFilter, startTimeFilter, dateFilter]);

  // Update status of the meeting
  const updateMeetingStatus = async (meetingId, status) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/events/${meetingId}`,
        { status },
        { headers: { 'x-auth-token': token } }
      );

      // Update the status of the meeting in the frontend
      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === meetingId ? { ...meeting, status } : meeting
        )
      );
      setFilteredMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === meetingId ? { ...meeting, status } : meeting
        )
      );
      console.log(data);
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  const handleBookingRequest = async (meetingId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:5000/api/booking",
        { eventId: meetingId },
        { headers: { 'x-auth-token': token } }
      );

      console.log("Booking successful:", data);
      alert("Booking request sent successfully!");
    } catch (error) {
      console.error("Error sending booking request:", error);
      alert("Failed to send booking request.");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center">Event Management</h1>
        <p className="text-gray-600 text-center mt-2">Manage and track your meetings with ease</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by meeting name"
          className="border rounded-lg p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border rounded-lg p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by status</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select
          className="border rounded-lg p-2"
          value={durationFilter}
          onChange={(e) => setDurationFilter(e.target.value)}
        >
          <option value="">Filter by duration</option>
          <option value="short">Short (&le; 30 min)</option>
          <option value="medium">Medium (30-60 min)</option>
          <option value="long">Long (&gt; 60 min)</option>
        </select>
        <div className="flex gap-2">
          <input
            type="time"
            className="border rounded-lg p-2 w-full"
            value={startTimeFilter.start}
            onChange={(e) =>
              setStartTimeFilter((prev) => ({ ...prev, start: e.target.value }))
            }
          />
          <input
            type="time"
            className="border rounded-lg p-2 w-full"
            value={startTimeFilter.end}
            onChange={(e) =>
              setStartTimeFilter((prev) => ({ ...prev, end: e.target.value }))
            }
          />
        </div>
        <input
          type="date"
          className="border rounded-lg p-2"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Meeting List */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {filteredMeetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{meeting.title}</h2>
            <p className="text-sm text-gray-600 mb-2">Start: {meeting.start}</p>
            <p>End: {meeting.end}</p>
            <p className="text-sm font-medium mb-4">Status: {meeting.status}</p>
            <div className="flex gap-4">
              
              <button


                onClick={() => updateMeetingStatus(meeting.id, 'Approved')}
                className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Disapprove


              </button>
              <button
                onClick={() => handleBookingRequest(meeting.id)}
                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Booking Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default EventPage;
