import React, { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Importing calendar component from react-calendar
import "react-calendar/dist/Calendar.css"; // Minimal calendar styles

const AvailabilityPage = () => {
  const [availability, setAvailability] = useState({});
  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState("month"); // State to track calendar view mode

  // Load availability from local storage on component mount
  useEffect(() => {
    const savedAvailability = localStorage.getItem("availability");
    if (savedAvailability) {
      setAvailability(JSON.parse(savedAvailability));
    }
  }, []);

  // Save availability to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("availability", JSON.stringify(availability));
  }, [availability]);

  const handleAddSlot = () => {
    // Validate input
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      alert("Please enter date, start time, and end time");
      return;
    }

    // Check if the selected date is in the past
    const selectedDateObj = new Date(newSlot.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day for comparison

    if (selectedDateObj < today) {
      alert("You cannot add availability for past dates");
      return;
    }

    // Create new availability slot
    const newAvailabilitySlot = {
      id: Date.now(),
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      description: newSlot.description,
    };

    // Update availability for the selected date
    setAvailability((prev) => ({
      ...prev,
      [newSlot.date]: [...(prev[newSlot.date] || []), newAvailabilitySlot],
    }));

    // Reset input fields
    setNewSlot({
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    });
  };

  const handleRemoveSlot = (date, id) => {
    setAvailability((prev) => ({
      ...prev,
      [date]: prev[date].filter((slot) => slot.id !== id),
    }));
  };

  const handleEditSlot = (date, id) => {
    const slotToEdit = availability[date].find((slot) => slot.id === id);
    setNewSlot({
      date,
      startTime: slotToEdit.startTime,
      endTime: slotToEdit.endTime,
      description: slotToEdit.description,
    });
    // Optionally, remove the slot before editing or handle differently
    handleRemoveSlot(date, id);
  };

  const renderAvailabilitySlots = (date) => {
    return availability[date].map((slot) => (
      <div
        key={slot.id}
        className="flex justify-between items-center bg-gray-100 p-4 rounded mb-2"
      >
        <div>
          <span className="font-bold">
            {slot.startTime} - {slot.endTime}
          </span>
          {slot.description && (
            <p className="text-sm text-gray-600">{slot.description}</p>
          )}
        </div>
        <div>
          <button
            onClick={() => handleEditSlot(date, slot.id)}
            className="text-black bg-white hover:bg-blue-200 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleRemoveSlot(date, slot.id)}
            className="text-white bg-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    ));
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    setNewSlot((prev) => ({ ...prev, date: date.toISOString().split("T")[0] }));
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Availability Schedule
      </h1>

      {/* View Mode Toggle */}
      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={() => toggleViewMode("month")}
          className={`px-4 py-2 rounded ${viewMode === "month" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Monthly View
        </button>
        <button
          onClick={() => toggleViewMode("week")}
          className={`px-4 py-2 rounded ${viewMode === "week" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Weekly View
        </button>
      </div>

     <div className="flex gap-3">
     <div className="mb-6">
        <Calendar
          onChange={onDateChange}
          value={selectedDate}
          minDate={new Date()} // Prevent selecting past dates
          view={viewMode} // Set calendar view based on state
          className="react-calendar w-full rounded-md shadow-md text-black"
        />
      </div>

      {/* Availability Input Form */}
      <div className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            value={newSlot.date}
            onChange={(e) =>
              setNewSlot((prev) => ({ ...prev, date: e.target.value }))
            }
            className="border rounded p-2"
            disabled
          />

          <input
            type="time"
            value={newSlot.startTime}
            onChange={(e) =>
              setNewSlot((prev) => ({ ...prev, startTime: e.target.value }))
            }
            className="border rounded p-2"
            placeholder="Start Time"
          />

          <input
            type="time"
            value={newSlot.endTime}
            onChange={(e) =>
              setNewSlot((prev) => ({ ...prev, endTime: e.target.value }))
            }
            className="border rounded p-2"
            placeholder="End Time"
          />

          <input
            type="text"
            value={newSlot.description}
            onChange={(e) =>
              setNewSlot((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border rounded p-2"
            placeholder="Description (optional)"
          />
        </div>
        <button
          onClick={handleAddSlot}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Availability Slot
        </button>
      </div>

     </div>
      {/* Calendar Component */}
     

      {/* Availability Display */}
      <div className="grid md:grid-cols-3 gap-4">
        {Object.keys(availability).map((date) => (
          <div key={date} className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-4">
              {new Date(date).toLocaleDateString()}
            </h2>
            {renderAvailabilitySlots(date)}

          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityPage;
