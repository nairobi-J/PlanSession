import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main'; // Your Main Component
import EventPage from './pages/EventPage'; // Your EventPage component
import AvailabilityPage from './pages/AvailabilityPage'; // Your AvailabilityPage component
import MeetingsPage from './pages/MeetingsPage'; // Your MeetingsPage component
import AnalyticsPage from './pages/AnalyticsPage'; // Your AnalyticsPage component
import NotificationsPage from './pages/NotificationsPage'; // Your NotificationsPage component
import Home from './pages/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the Main route as the parent route */}
        <Route path="/main" element={<Main />}>
          {/* Define the nested routes for content rendering */}
          <Route path="event" element={<EventPage />} />
          <Route path="availability" element={<AvailabilityPage />} />
          <Route path="meetings" element={<MeetingsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
        
        {/* Home route */}
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;
