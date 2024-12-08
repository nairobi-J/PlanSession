import React, { useState } from "react";

const EventPage = () => {
  // Sample meeting data
  const [meetings, setMeetings] = useState([
    { id: 1, name: "Team Meeting", status: "Pending" },
    { id: 2, name: "Client Presentation", status: "Done" },
    { id: 3, name: "Project Kickoff", status: "Cancelled" },
  ]);

  return (
    <div className="p-6  min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Event Management
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Manage and track your meetings with ease
        </p>
      </div>

      {/* Meeting List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition-shadow"
          >
            {/* Meeting Details */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {meeting.name}
            </h2>
            <p
              className={`text-sm font-medium mb-4 ${
                meeting.status === "Pending"
                  ? "text-yellow-500"
                  : meeting.status === "Done"
                    ? "text-green-500"
                    : "text-red-500"
              }`}
            >
              Status: {meeting.status}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                View Booking
              </button>
              <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Button */}
      <div className="mt-10 flex justify-center">
        <button className="bg-gradient-to-r from-green-400 to-green-600 text-white text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transform transition-all">
          Create New Event
        </button>
      </div>
    </div>
  );
};

export default EventPage;
