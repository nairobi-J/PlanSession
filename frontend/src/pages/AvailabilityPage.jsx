import React, { useState } from "react";

const AvailabilityPage = () => {
  // State for storing availability information
  const [availability, setAvailability] = useState([
    { day: "Monday", unavailable: false, times: [] },
    { day: "Tuesday", unavailable: false, times: [] },
    { day: "Wednesday", unavailable: false, times: [] },
    { day: "Thursday", unavailable: false, times: [] },
    { day: "Friday", unavailable: false, times: [] },
    { day: "Saturday", unavailable: false, times: [] },
    { day: "Sunday", unavailable: false, times: [] },
  ]);

  // Handle toggling availability for a day
  const toggleDayAvailability = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].unavailable =
      !updatedAvailability[index].unavailable;
    if (updatedAvailability[index].unavailable) {
      updatedAvailability[index].times = []; // Reset times when marking day unavailable
    }
    setAvailability(updatedAvailability);
  };

  // Handle adding a specific time to a day
  const addTime = (index, time) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].times.push(time);
    setAvailability(updatedAvailability);
  };

  // Handle removing a specific time from a day
  const removeTime = (index, time) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].times = updatedAvailability[index].times.filter(
      (t) => t !== time,
    );
    setAvailability(updatedAvailability);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200  min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Manage Availability
        </h1>
        <p className="text-gray-600 mt-2">
          Select days and times when you are unavailable.
        </p>
      </div>

      {/* Days List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availability.map((day, index) => (
          <div
            key={day.day}
            className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition-shadow"
          >
            {/* Day Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {day.day}
              </h2>
              <button
                onClick={() => toggleDayAvailability(index)}
                className={`px-4 py-2 rounded-lg text-white ${
                  day.unavailable
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {day.unavailable ? "Unavailable" : "Available"}
              </button>
            </div>

            {/* Time Management */}
            {!day.unavailable && (
              <>
                <div className="space-y-2">
                  <h3 className="text-gray-700 font-medium">
                    Unavailable Times:
                  </h3>
                  {day.times.length > 0 ? (
                    <ul className="space-y-2">
                      {day.times.map((time, timeIndex) => (
                        <li
                          key={timeIndex}
                          className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md"
                        >
                          <span>{time}</span>
                          <button
                            onClick={() => removeTime(index, time)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No unavailable times added.
                    </p>
                  )}
                </div>

                {/* Add Time */}
                <div className="mt-4">
                  <input
                    type="time"
                    className="border border-gray-300 rounded-md px-3 py-2 mr-2 outline-none focus:ring-2 focus:ring-blue-500"
                    id={`time-input-${index}`}
                  />
                  <button
                    onClick={() =>
                      addTime(
                        index,
                        document.getElementById(`time-input-${index}`).value,
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Add Time
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityPage;
