import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main'; // Your Main Component
import EventPage from './pages/EventPage'; // Your EventPage component
import AvailabilityPage from './pages/AvailabilityPage'; // Your AvailabilityPage component
import MeetingsPage from './pages/MeetingsPage'; // Your MeetingsPage component
import AnalyticsPage from './pages/AnalyticsPage'; // Your AnalyticsPage component
import NotificationsPage from './pages/NotificationsPage'; // Your NotificationsPage component
import Home from './pages/Home';
import Modal from './components/Modal'; 
import Create from './pages/Create';
import Profile from './pages/Profile';
import Dummy from './pages/Dummy';
import Requests from './pages/Requests';



const App = () => {

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [modalType, setModalType] = useState(''); // For controlling modal type (guest or host)

  // Function to toggle modal visibility
  const openModal = (type) => {
    setModalType(type); // Set modal type (host or guest)
    setIsModalVisible(true); // Show modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close modal
  };

 

  return (
    <Router>
      <Routes>
        {/* Define the Main route as the parent route */}
        <Route path="/main" element={<Main />} >
          {/* Define the nested routes for content rendering */}
          <Route path='' element={<Dummy />} />
          <Route path="event" element={<EventPage />} />
          <Route path="availability" element={<AvailabilityPage />} />
          <Route path="meetings" element={<MeetingsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="create" element={<Create />} />
          <Route path='profile' element={<Profile />} />
          <Route path='requests' element={<Requests/>} />
        </Route>
        
        {/* Home route */}
        <Route path="/" element={<Home openModal={openModal} />} />
      </Routes>

      {/* Modal for user login/guest/host */}
      {isModalVisible && (
        <Modal
          onClose={closeModal} // Close modal logic
          modalType={modalType} // Pass modal type (login, guest, host)
        />
      )}

     
      
    </Router>
  );
  
};

export default App;
