import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    createdEvents: 0,
    completedEvents: 0,
    rescheduledEvents: 0,
    cancelledEvents: 0,
    popularEvents: [],
    popularTimes: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch analytics data (replace with actual API call)
    const fetchAnalytics = async () => {
      setLoading(true);
      setTimeout(() => {
        setAnalyticsData({
          createdEvents: 45,
          completedEvents: 38,
          rescheduledEvents: 5,
          cancelledEvents: 2,
          popularEvents: [
            { name: "Team Meeting", count: 18 },
            { name: "One-on-One", count: 12 },
            { name: "Workshop", count: 8 },
          ],
          popularTimes: [
            { time: "10:00 AM - 11:00 AM", count: 25 },
            { time: "2:00 PM - 3:00 PM", count: 15 },
            { time: "5:00 PM - 6:00 PM", count: 10 },
          ],
        });
        setLoading(false);
      }, 1500); // Simulate network delay
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200  p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Event Analytics
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">Loading analytics...</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Overview Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-blue-800">
                {analyticsData.createdEvents}
              </h2>
              <p className="text-gray-600">Created Events</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-green-800">
                {analyticsData.completedEvents}
              </h2>
              <p className="text-gray-600">Completed Events</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-yellow-800">
                {analyticsData.rescheduledEvents}
              </h2>
              <p className="text-gray-600">Rescheduled Events</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-red-800">
                {analyticsData.cancelledEvents}
              </h2>
              <p className="text-gray-600">Cancelled Events</p>
            </div>
          </div>

          {/* Popular Events Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Popular Events
            </h2>
            <ul className="space-y-3">
              {analyticsData.popularEvents.map((event, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <span className="text-gray-700">{event.name}</span>
                  <span className="font-medium text-gray-800">
                    {event.count} bookings
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Times Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Popular Times
            </h2>
            <ul className="space-y-3">
              {analyticsData.popularTimes.map((time, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <span className="text-gray-700">{time.time}</span>
                  <span className="font-medium text-gray-800">
                    {time.count} bookings
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
