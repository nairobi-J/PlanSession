import React, { useState,useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; // Use Outlet to render nested routes
import { Search } from 'lucide-react'; // Search icon
import { getLocalTime } from '../resource';

const Main = () => {
  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(false); // For dashboard size toggle
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false); // For search bar size toggle
  const [searchTerm, setSearchTerm] = useState(""); // For dynamic search functionality
  const [startDate, setStartDate] = useState(""); // For date range start
  const [endDate, setEndDate] = useState(""); // For date range end
  const [timePreference, setTimePreference] = useState(""); // For time preference
  const [hostName, setHostName] = useState(""); // For host name filtering
  
  const toggleDashboardSize = () => {
    setIsDashboardCollapsed(!isDashboardCollapsed);
  };

  const toggleSearchSize = () => {
    setIsSearchCollapsed(!isSearchCollapsed);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const handleTimeChange = (event) => {
    setTimePreference(event.target.value);
  };

  const handleHostChange = (event) => {
    setHostName(event.target.value);
  };
  const handleLogOut =(e)=>{
    localStorage.removeItem('token'); 


    window.location.href = '/';
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/main');
  }
 
 
  // Apply filters based on the input values
  const applyFilters = () => {
    // Here you can implement logic to filter your slots data based on searchTerm, date range, time, and hostName
    console.log('Applying Filters:', { searchTerm, startDate, endDate, timePreference, hostName });
  };
  const [localTime, setLocalTime] = useState(getLocalTime());


    // Fetch the local time when the component mounts
    useEffect(() => {
      // Update the local time every second
      const intervalId = setInterval(() => {
          setLocalTime(getLocalTime());  // Call getLocalTime and update state
      }, 1000);  // 1000ms = 1 second

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="flex flex-col w-screen">
      <div className="p-4 flex flex-col shadow-lg "> 
     
     
        {/* Header Section */}
        <div className="flex  p-4 items-center justify-between gap-4 shadow-lg">
         
          <div className='items-start flex gap-5 '>
          <div onClick={handleClick} className='text-green-600 text-2xl'>
               Session
          </div>
          <Link to="event" className="text-green-500">Event</Link>
          <Link to="availability" className="text-green-500">Availability</Link>
          <Link to="meetings" className="text-green-500">Meetings</Link>
          <Link to="analytics" className="text-green-500">Analytics</Link>
          <Link to="notifications" className="text-green-500">Notifications</Link>
          <Link to="create" className="text-green-500">Create</Link>
          <Link to="profile" className="text-green-500">Profile</Link>
          <Link to="requests" className="text-green-500">Requests</Link>
          </div>
          <div className='items-end'>
          <button onClick={handleLogOut}>Log Out</button>
          </div>
         
        </div>
       <div className='flex flex-row gap-20 mt-4'>
       <div className="mt-4 ">
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleDateChange}
            className="p-2 border border-gray-300 rounded-md"
          />
          <span className="mx-2">to</span>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="mr-2">Preferred Time:</label>
          <input
            type="time"
            value={timePreference}
            onChange={handleTimeChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="mr-2">Host Name:</label>
          <input
            type="text"
            placeholder="Host Name"
            value={hostName}
            onChange={handleHostChange}
            className="outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={applyFilters}
          className="w-20 bg-gradient-to-r from-green-200 to-green-100 rounded-md text-black"
        >
          Apply Filters
        </button>
        <div className='flex justify-center items-center text-2xl text-green-500'>
         {localTime}
        </div>
       </div>
        {/* Search Bar */}
        {/* <div className="flex items-center">
          <Search className="text-gray-500 mr-3" size={24} />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <hr/>
        </div> */}

        {/* Date Range and Time Preferences Filters */}
        
      </div>

      <div className="">
        {/* The Outlet renders the nested route */}
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
