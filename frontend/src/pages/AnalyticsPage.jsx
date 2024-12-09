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

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const renderData = () => {
    switch (filter) {
      case "startTime":
        return (
          <ul className="bg-gray-100 p-4 rounded-lg">
            {analytics.startTime.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>Hour:</strong> {item.meeting_hour} <strong>Meetings:</strong> {item.total_meetings}
              </li>
            ))}
          </ul>
        );
      case "duration":
        return (
          <ul className="bg-gray-100 p-4 rounded-lg">
            {analytics.duration.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>Category:</strong> {item.duration_category} <strong>Meetings:</strong> {item.total_meetings}
              </li>
            ))}
          </ul>
        );
      case "topUsers":
        return (
          <ol className="bg-gray-100 p-4 rounded-lg">
            {analytics.topUsers.map((user, index) => (
              <li key={index} className="mb-2">
                <strong>User ID:</strong> {user.userId} <strong>Total Meetings:</strong> {user.total_meetings}
              </li>
            ))}
          </ol>
        );
      case "peakDays":
        return (
          <ul className="bg-gray-100 p-4 rounded-lg">
            {analytics.peakDays.map((day, index) => (
              <li key={index} className="mb-2">
                <strong>Day:</strong> {day.meeting_day} <strong>Meetings:</strong> {day.total_meetings}
              </li>
            ))}
          </ul>
        );
      case "averageDuration":
        return (
          <div className="bg-gray-100 p-4 rounded-lg">
            <strong>Average Duration:</strong> {Math.round(analytics.averageDuration)} minutes
          </div>
        );
      default:
        return <div>Select a valid filter.</div>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Analytics Insights</h1>

      <div className="mb-4">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter Analysis:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="startTime">Meeting Start Times</option>
          <option value="duration">Meeting Durations</option>
          <option value="topUsers">Top Users</option>
          <option value="peakDays">Peak Days</option>
          <option value="averageDuration">Average Duration</option>
        </select>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
        {renderData()}
      </section>
    </div>
  );
};

export default AnalyticsPage;
