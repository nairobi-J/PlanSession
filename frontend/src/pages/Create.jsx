import React, { useState } from "react";

const EventPage = () => {
  const getDayOfWeek = (date) => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dateObj = new Date(date); // Convert the date string to Date object
    const day = dateObj.getDay();   // Get the day of the week (0-6)
    return daysOfWeek[day];         // Map day number to day name
  };

  const [events, setEvents] = useState([]); // Stores the list of events
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    day:"",
  }); // Data for creating a new event
 console.log(newEvent);
  const [meetingDetails, setMeetingDetails] = useState({
    eventId: "",
    name: "",
    meetingType: "googleMeet",
    zoomLink: "",
    googleMeetLink: "",
    inPersonAddress: "",
  }); // Data for scheduling a meeting

  // Create a new event
  const handleEventCreation = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.time) {
      alert("Please fill in all the event details.");
      return;
    }
    const eventId = events.length + 1; // Simple ID generation
    setEvents([...events, { ...newEvent, id: eventId }]);
    setNewEvent({ name: "",  startTime: "", endTime: "", location: "",date: "",day:"" });
    alert("Event created successfully!");
  };

  // Schedule a meeting
  const handleMeetingScheduling = () => {
    if (!meetingDetails.eventId || !meetingDetails.name) {
      alert("Please select an event and provide meeting details.");
      return;
    }
    alert(`Meeting scheduled successfully for event ID: ${meetingDetails.eventId}`);
    setMeetingDetails({
      eventId: "",
      name: "",
      meetingType: "googleMeet",
      zoomLink: "",
      googleMeetLink: "",
      inPersonAddress: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Event Management
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Event Creation */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Create Event
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                placeholder="Enter event name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          
            <div>
              <label className="block text-gray-700 font-medium mb-2">
               Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
               End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                placeholder="Enter location"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
  <label className="block text-gray-700 font-medium mb-2">
    Date
  </label>
  <input
    type="date"
    name="date"
    value={newEvent.date}
    onChange={(e) => {
      const selectedDate = e.target.value;
      const day = getDayOfWeek(selectedDate); // Get the day from the selected date

      console.log(`Selected Date: ${selectedDate}, Day: ${day}`); 

      setNewEvent({
        ...newEvent,
        date: selectedDate,
        day: day, // Store the day in the state
      });
    }}
    className="w-full border border-gray-300 rounded-md p-2"
  />
</div>

            <button
              type="button"
              onClick={handleEventCreation}
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
            >
              Create Event
            </button>
          </form>
        </div>

        {/* Meeting Scheduling */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Schedule a Meeting
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Event
              </label>
              <select
                name="eventId"
                value={meetingDetails.eventId}
                onChange={(e) =>
                  setMeetingDetails({
                    ...meetingDetails,
                    eventId: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select an Event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} ({event.date})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Meeting Name
              </label>
              <input
                type="text"
                name="name"
                value={meetingDetails.name}
                onChange={(e) =>
                  setMeetingDetails({ ...meetingDetails, name: e.target.value })
                }
                placeholder="Enter meeting name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Meeting Type
              </label>
              <select
                name="meetingType"
                value={meetingDetails.meetingType}
                onChange={(e) =>
                  setMeetingDetails({
                    ...meetingDetails,
                    meetingType: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="googleMeet">Google Meet</option>
                <option value="zoom">Zoom</option>
                <option value="inPerson">In-Person</option>
              </select>
            </div>
            {meetingDetails.meetingType === "googleMeet" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Google Meet Link
                </label>
                <input
                  type="text"
                  name="googleMeetLink"
                  value={meetingDetails.googleMeetLink}
                  onChange={(e) =>
                    setMeetingDetails({
                      ...meetingDetails,
                      googleMeetLink: e.target.value,
                    })
                  }
                  placeholder="Enter Google Meet link"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            )}
            {meetingDetails.meetingType === "zoom" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Zoom Link
                </label>
                <input
                  type="text"
                  name="zoomLink"
                  value={meetingDetails.zoomLink}
                  onChange={(e) =>
                    setMeetingDetails({
                      ...meetingDetails,
                      zoomLink: e.target.value,
                    })
                  }
                  placeholder="Enter Zoom link"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            )}
            {meetingDetails.meetingType === "inPerson" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="inPersonAddress"
                  value={meetingDetails.inPersonAddress}
                  onChange={(e) =>
                    setMeetingDetails({
                      ...meetingDetails,
                      inPersonAddress: e.target.value,
                    })
                  }
                  placeholder="Enter address for in-person meeting"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            )}
            <button
              type="button"
              onClick={handleMeetingScheduling}
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
            >
              Schedule Meeting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
