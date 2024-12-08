import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // Use Outlet to render nested routes
import { Search } from 'lucide-react'; // Search icon

const Main = () => {
  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(false); // For dashboard size toggle
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false); // For search bar size toggle
  const [searchTerm, setSearchTerm] = useState(""); // For dynamic search functionality

  const toggleDashboardSize = () => {
    setIsDashboardCollapsed(!isDashboardCollapsed);
  };

  const toggleSearchSize = () => {
    setIsSearchCollapsed(!isSearchCollapsed);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar / Dashboard */}
      <div
        className={`bg-blue-200 p-4 transition-all ${isDashboardCollapsed ? 'w-16' : 'w-64'}`}
      >
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-6 w-full"
          onClick={() => console.log('Create clicked')} // Placeholder for Create button functionality
        >
          Create
        </button>
        <div className="flex flex-col gap-4">
          <Link to="event" className="text-blue-700 hover:text-blue-900">
            Event
          </Link>
          <Link to="availability" className="text-blue-700 hover:text-blue-900">
            Availability
          </Link>
          <Link to="meetings" className="text-blue-700 hover:text-blue-900">
            Meetings
          </Link>
          <Link to="analytics" className="text-blue-700 hover:text-blue-900">
            Analytics
          </Link>
          <Link to="notifications" className="text-blue-700 hover:text-blue-900">
            Notifications
          </Link>
        </div>
        {/* <button
          onClick={toggleDashboardSize}
          className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md"
        >
          {isDashboardCollapsed ? 'Expand Dashboard' : 'Collapse Dashboard'}
        </button> */}
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Search Bar - Positioned at the top of the content */}
        <div className={`flex justify-between items-center mb-4 transition-all ${isSearchCollapsed ? 'h-10' : 'h-16'}`}>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full">
            <Search className="text-gray-500 mr-2" size={30} />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none w-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {/* Toggle Button for Search Bar */}
         
        </div>

        {/* Dynamic Content Rendering - Nested Route will show here */}
        <div className="mt-4">
          {/* The Outlet renders the nested route */}
          <Outlet context={{ searchTerm }} /> {/* Passing search term to children via Outlet */}
        </div>
      </div>
    </div>
  );
};

export default Main;
