import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; // Use Outlet to render nested routes
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

  const navigate = useNavigate();
  return (
    <div className="flex h-screen ">
      {/* Sidebar / Dashboard */}
      <div
        className={` p-4 transition-all bg-white text-white ${isDashboardCollapsed ? 'w-10' : 'w-64'}`}
      >
        {/* <button
          className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-black py-2 px-4 rounded-md mb-6 w-full"

          onClick={() => } // Placeholder for Create button functionality
        >
          Create
        </button> */}
        <div className="flex flex-col gap-4">
          <Link to="event" className="text-black hover:text-blue-900">
            Event
          </Link>
          <Link to="availability" className="text-black hover:text-blue-900">
            Availability
          </Link>
          <Link to="meetings" className="text-black hover:text-blue-900">
            Meetings
          </Link>
          <Link to="analytics" className="text-black hover:text-blue-900">
            Analytics
          </Link>
          <Link to="notifications" className="text-black hover:text-blue-900">
            Notifications
          </Link>
          <Link to="create" className="text-black hover:text-blue-900">
            Create 
          </Link>
        </div>
        <button
          onClick={toggleDashboardSize}
          className="mt-6 py-2 px-4 bg-gradient-to-r  from-green-400 via-green-300  to-green-100 rounded-md"
        >
          {isDashboardCollapsed ? '>' : '<'}
        </button>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-6 overflow-auto  w-screen">
        {/* Search Bar - Positioned at the top of the content */}
        <div className={`flex justify-center items-center mb-4 transition-all duration-300 ${isSearchCollapsed ? 'h-10' : 'h-16'}`}>
  <div className="flex items-center border border-gray-300 rounded-lg p-2 w-1/2 bg-white">
    <Search className="text-gray-500 mr-3" size={24} />
    <input
      type="text"
      placeholder="Search..."
      className="outline-none w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>
  {/* Toggle Button for Search Bar */}
</div>


        {/* Dynamic Content Rendering - Nested Route will show here */}
        <div className="mt-4  ">
          {/* The Outlet renders the nested route */}
          <Outlet context={{ searchTerm }} /> {/* Passing search term to children via Outlet */}
        </div>
      </div>
    </div>
  );
};

export default Main;
