import React, { useState } from 'react';

const Profile = () => {
  // Dummy user data
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
        user.theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
      } p-8 min-h-screen`}
    >
      <div className="flex justify-center items-center flex-col">
        {/* Profile Picture */}
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="rounded-full mb-4"
        />

        {/* Username and Role */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl">{user.username}</h1>
          <p className="text-lg text-gray-500">({user.role})</p>
          <button
            onClick={() => setEditUsername(true)}
            className="ml-4 bg-blue-500 text-white p-2 rounded-md"
          >
            Edit Name
          </button>
        </div>

        {/* Editable Name */}
        {editUsername && (
          <div className="mt-4">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="p-2 border rounded-md"
              placeholder="Enter new username"
            />
            <input
              type="password"
              value={passwordForName}
              onChange={(e) => setPasswordForName(e.target.value)}
              className="p-2 border rounded-md mt-2"
              placeholder="Enter password to confirm"
            />
            <button
              onClick={handleEditUsername}
              className="bg-green-500 text-white p-2 rounded-md mt-2"
            >
              Save Name
            </button>
            <button
              onClick={() => setEditUsername(false)}
              className="bg-red-500 text-white p-2 rounded-md mt-2 ml-2"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Password Editing (only for hosts) */}
        <div className="mt-8">
          <h2 className="text-xl">Password:</h2>
          {user.role === 'host' && !editPassword && (
            <div className="flex justify-between items-center">
              <p>********</p>
              <button
                onClick={() => setEditPassword(true)}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Edit Password
              </button>
            </div>
          )}

          {/* Editable Password */}
          {editPassword && (
            <div className="mt-4">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 border rounded-md"
                placeholder="Enter new password"
              />
              {user.role === 'host' && (
                <div>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="p-2 border rounded-md mt-2"
                    placeholder="Enter new email"
                  />
                </div>
              )}
              <button
                onClick={handleEditPassword}
                className="bg-green-500 text-white p-2 rounded-md mt-2"
              >
                Save Password
              </button>
              <button
                onClick={() => setEditPassword(false)}
                className="bg-red-500 text-white p-2 rounded-md mt-2 ml-2"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="mt-8">
          <button
            onClick={toggleTheme}
            className="bg-yellow-500 text-white p-2 rounded-md"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
