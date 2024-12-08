import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';  // Importing Modal Component

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

  // Open modal for different types (Login, Sign Up, etc.)
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle login success (e.g., redirect to /main)
  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    navigate('/main');
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-3 bg-blue-400 text-white">
        {/* Logo or Navbar Title */}
        <h1 className="text-xl">Plan Session</h1>

        {/* Navbar Buttons */}
        <div className="flex gap-4">
          {/* Log In Button */}
          <button
            onClick={() => openModal('login')}  // Trigger modal for login
            className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Modal for login/signup */}
      {isModalOpen && <Modal onClose={closeModal} modalType={modalType} onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default Navbar;
