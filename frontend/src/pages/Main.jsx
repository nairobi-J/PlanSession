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
    
    <div className="flex flex-col w-screen">
      {/* Sidebar / Dashboard */}
      <div
        className={` transition-all w-full  text-black bg-white ${isDashboardCollapsed ? 'w-10' : 'w-64'}`} 
      > 
       <div className="p-4 shadow-lg">


  {/* Wrap links in a div or ul with gap */}
  <div className="flex flex-row gap-5 mt-4 ">
    <Link to="event" className="">Event</Link>
    <Link to="availability" className="hover:text-blue-900">Availability</Link>
    <Link to="meetings" className="hover:text-blue-900">Meetings</Link>
    <Link to="analytics" className="hover:text-blue-900">Analytics</Link>
    <Link to="notifications" className="hover:text-blue-900">Notifications</Link>
    <Link to="create" className="hover:text-blue-900">Create</Link>
    <Link to="profile" className="hover:text-blue-900">Profile</Link>
  </div>

  {/* Search Bar */}
  <div className="flex items-center mt-4">
    <Search className="text-gray-500 mr-3" size={24} />
    <input
      type="text"
      placeholder="Search..."
      className="outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>
</div>

        <hr/>
        {/* <button
          onClick={toggleDashboardSize}
          className="mt-6 py-2 px-4 bg-gradient-to-r from-green-200 to-green-100 rounded-md text-black"
        >
          {isDashboardCollapsed ? '>' : '<'}
        </button> */}
       
      </div>

      {/* Main Content Section */} 
      <div className=" ">
        {/* Search Bar - Positioned at the top of the content */}
       

        {/* Dynamic Content Rendering - Nested Route will show here */}
        
        <div className="">
      
          {/* The Outlet renders the nested route */}
          <Outlet  /> {/* Passing search term to children via Outlet */}
        </div>
        
        
      </div>
    </div>
  );
};

export default Main;
