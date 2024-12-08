import axios from "axios";
import React, { useEffect, useState } from "react";

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
      
        const { data } = await axios.get(`http://localhost:5000/api/events/user`, {
          headers: {
           'x-auth-token': token
          }
        } );

        // Map data to match frontend structure
        const formattedData = data.map((meeting) => ({
          id: meeting.id,
          title: meeting.name, // Map 'name' to 'title'
          date: meeting.date.split("T")[0], // Extract date part
          time: `${meeting.startTime} - ${meeting.endTime}`, // Combine times
          location: meeting.location,
          day: meeting.day,
          duration: meeting.duration,
          status: meeting.status || "Scheduled", // Default status
        }));

        setMeetings(formattedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  // Unique years and months for filters
  const uniqueYears = Array.from(
    new Set(meetings.map((m) => m.date.split("-")[0]))
  );
  const uniqueMonths = Array.from(
    new Set(meetings.map((m) => m.date.split("-")[1]))
  );

  // Filter meetings
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch = meeting.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter ? meeting.date.startsWith(yearFilter) : true;
    const matchesMonth = monthFilter
      ? meeting.date.split("-")[1] === monthFilter
      : true;
    return matchesSearch && matchesYear && matchesMonth;
  });

  return (
    <>
    
  
    

       
        <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
     
            <div className="">
              <label className="block text-gray-700 font-medium mb-2">Filter by Year</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">All Years</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Filter */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Filter by Month</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                <option value="">All Months</option>
                {uniqueMonths.map((month) => (
                  <option key={month} value={month}>
                    {new Date(2024, parseInt(month, 10) - 1).toLocaleString("default", {
                      month: "long",

                    }
                  )}
                </option>
              ))}
            </select>

          </div>
        </div>
     
        {/* Header Section */}
      


      {/* Meetings Display */}
      <div className="space-y-6">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg border"
            >
              <div>
                <h4 className="text-lg font-medium text-gray-800">
                  {meeting.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {meeting.date} ({meeting.day}) at {meeting.time}
                </p>
                <p className="text-sm text-gray-500">
                  Location: {meeting.location}
                </p>
              </div>
              <span
                className={`px-4 py-1 text-sm font-medium rounded-lg ${
                  meeting.status === "Scheduled"
                    ? "bg-blue-100 text-blue-600"
                    : meeting.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {meeting.status}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-700">No meetings found.</div>
        )}
      </div>
    </div>

  );
};

export default MeetingsPage;
