import React, { useEffect, useState } from "react";
import axios from "axios";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({
    startTime: [],
    duration: [],
    topUsers: [],
    peakDays: [],
    averageDuration: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("startTime");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const [startTimeRes, durationRes, topUsersRes, peakDaysRes, avgDurationRes] = await Promise.all([
          axios.get("http://localhost:5000/api/analysis/startTime"),
          axios.get("http://localhost:5000/api/analysis/duration"),
          axios.get("http://localhost:5000/api/analysis/topUsers"),
          axios.get("http://localhost:5000/api/analysis/peakDays"),
          axios.get("http://localhost:5000/api/analysis/averageDuration"),
        ]);

        setAnalytics({
          startTime: startTimeRes.data,
          duration: durationRes.data,
          topUsers: topUsersRes.data,
          peakDays: peakDaysRes.data,
          averageDuration: avgDurationRes.data[0]?.avg_duration || 0,
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const renderData = () => {
    switch (filter) {
      case "startTime":
        return (
          <ul className="space-y-4">
            {analytics.startTime.map((item, index) => (
              <li key={index} className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-700">Hour: {item.meeting_hour}</span>
                <span className="font-bold text-blue-600">Meetings: {item.total_meetings}</span>
              </li>
            ))}
          </ul>
        );
      case "duration":
        return (
          <ul className="space-y-4">
            {analytics.duration.map((item, index) => (
              <li key={index} className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-700">Category: {item.duration_category}</span>
                <span className="font-bold text-green-600">Meetings: {item.total_meetings}</span>
              </li>
            ))}
          </ul>
        );
      case "topUsers":
        return (
          <ul className="space-y-4">
            {analytics.topUsers.map((user, index) => (
              <li key={index} className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-700">User ID: {user.userId}</span>
                <span className="font-bold text-purple-600">Meetings: {user.total_meetings}</span>
              </li>
            ))}
          </ul>
        );
      case "peakDays":
        return (
          <ul className="space-y-4">
            {analytics.peakDays.map((day, index) => (
              <li key={index} className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-700">Day: {day.meeting_day}</span>
                <span className="font-bold text-indigo-600">Meetings: {day.total_meetings}</span>
              </li>
            ))}
          </ul>
        );
      case "averageDuration":
        return (
          <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg shadow-sm">
            <span className="text-lg font-semibold text-gray-700">
              Average Duration:{" "}
              <span className="text-orange-500 font-bold">{Math.round(analytics.averageDuration)} minutes</span>
            </span>
          </div>
        );
      default:
        return <div className="text-center text-red-500">Select a valid filter.</div>;
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Analytics Dashboard</h1>

        <div className="mb-8">
          <label htmlFor="filter" className="block text-lg font-medium text-gray-700 mb-2">
            Choose Analysis Type:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="startTime">Meeting Start Times</option>
            <option value="duration">Meeting Durations</option>
            <option value="topUsers">Top Users</option>
            <option value="peakDays">Peak Days</option>
            <option value="averageDuration">Average Duration</option>
          </select>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Analysis Results</h2>
          {loading ? (
            <div className="text-center text-blue-500 font-medium animate-pulse">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            renderData()
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
