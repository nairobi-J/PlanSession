import React, { useState } from 'react';
import { FaUserEdit, FaKey, FaSun, FaMoon } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState({
    username: 'John Doe',
    role: 'host', // This could be 'guest' or 'host'
    password: '123456', // Just a placeholder, should be fetched securely     
    email: 'john@example.com',
    theme: 'light', // For theme (light or dark)
  });

  // States for editable fields
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState('');
  const [passwordForName, setPasswordForName] = useState('');
  const [newEmail, setNewEmail] = useState(user.email);

  // Theme toggle function
  const toggleTheme = () => {
    setUser((prevUser) => ({
      ...prevUser,
      theme: prevUser.theme === 'light' ? 'dark' : 'light',
    }));
  };

  // Handler for name editing
  const handleEditUsername = () => {
    if (passwordForName === user.password) {
      setUser((prevUser) => ({
        ...prevUser,
        username: newUsername,
      }));
      setEditUsername(false);
      setPasswordForName('');
    } else {
      alert('Incorrect password!');
    }
  };

  // Handler for password editing (only for hosts)
  const handleEditPassword = () => {
    if (user.role === 'host') {
      setUser((prevUser) => ({
        ...prevUser,
        password: newPassword,
        email: newEmail,
      }));
      setEditPassword(false);
      setNewPassword('');
      setNewEmail('');
    } else {
      alert('Password cannot be edited for guests.');
    }
  };

  return (
    <div
      className={`${
        user.theme === 'light' ? 'bg-gray-100 text-black' : 'bg-black text-white'
      } p-8 min-h-screen w-screen transition-all duration-300`}
    >
      <div className="flex justify-center items-center flex-col">
        {/* Profile Picture */}
        <div className="flex justify-center items-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full mb-4 w-40 h-40 border-4 border-blue-500"
          />
        </div>

        {/* Username and Role */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">{user.username}</h1>
          <p className="text-lg text-gray-500">{user.role === 'host' ? 'Host' : 'Guest'}</p>
        </div>

        {/* Edit Username Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setEditUsername(true)}
            className="bg-blue-500 text-white p-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-all duration-300"
          >
            <FaUserEdit /> Edit Name
          </button>
        </div>

        {/* Editable Username Section */}
        {editUsername && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-lg max-w-xs mx-auto">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="p-2 w-full border border-gray-400 rounded-md mb-2"
              placeholder="Enter new username"
            />
            <input
              type="password"
              value={passwordForName}
              onChange={(e) => setPasswordForName(e.target.value)}
              className="p-2 w-full border border-gray-400 rounded-md mb-4"
              placeholder="Enter password to confirm"
            />
            <div className="flex justify-between">
              <button
                onClick={handleEditUsername}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setEditUsername(false)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Password Editing (only for hosts) */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Password:</h2>
          {user.role === 'host' && !editPassword && (
            <div className="flex justify-between items-center">
              <p>********</p>
              <button
                onClick={() => setEditPassword(true)}
                className="bg-blue-500 text-white p-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-all duration-300"
              >
                <FaKey /> Edit Password
              </button>
            </div>
          )}

          {/* Editable Password */}
          {editPassword && (
            <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-lg max-w-xs mx-auto">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 w-full border border-gray-400 rounded-md mb-2"
                placeholder="Enter new password"
              />
              {user.role === 'host' && (
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="p-2 w-full border border-gray-400 rounded-md mb-4"
                  placeholder="Enter new email"
                />
              )}
              <div className="flex justify-between">
                <button
                  onClick={handleEditPassword}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditPassword(false)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <div className="mt-8">
          <button
            onClick={toggleTheme}
            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-all duration-300 flex items-center gap-2"
          >
            {user.theme === 'light' ? <FaSun /> : <FaMoon />} Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
