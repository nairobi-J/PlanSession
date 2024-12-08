import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import Modal from './components/Modal'; // Import Modal component

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
      <div>
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 bg-blue-400 text-white">
          {/* Logo */}
          <img
            src='/logo.png'
            alt='Logo'
            className="h-full w-auto max-h-20"
          />

          {/* Button to open the Log In modal */}
          <button
            onClick={() => openModal('host')} // Open login modal as host
            className="px-4 p-3 bg-blue-300 hover:bg-blue-600 rounded-lg text-black"
          >
            Log In
          </button>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home openModal={openModal} />} />
          <Route path="/main" element={<Main />} />
        </Routes>

        {/* Modal Component */}
        {isModalVisible && (
          <Modal
            onClose={closeModal} // Close modal logic
            modalType={modalType} // Pass modal type (guest or host)
          />
        )}
      </div>
    </Router>
  );
};

export default App;
