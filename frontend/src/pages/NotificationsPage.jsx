import React, { useState } from 'react';

const NotificationsPage = () => {
  // Pseudo data for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'You have a new message from John', timestamp: '2 minutes ago' },
    { id: 2, message: 'Your order has been shipped', timestamp: '1 hour ago' },
    { id: 3, message: 'New comment on your post', timestamp: '3 hours ago' },
    { id: 4, message: 'Your profile was viewed', timestamp: '5 hours ago' },
    { id: 5, message: 'System update available', timestamp: '1 day ago' },
  ]);

  // Add a new notification
  const addNotification = () => {
    const newNotification = {
      id: Date.now(), // Unique id based on current timestamp
      message: 'New notification added!',
      timestamp: 'Just now',
    };
    setNotifications([...notifications, newNotification]);
  };

  // Delete a notification by id
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Notifications</h2>
      
      {/* Add Notification Button */}
      <button
        onClick={addNotification}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
      >
        Add Notification
      </button>

      <div className="max-w-2xl w-full space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 text-sm">{notification.message}</p>
                <span className="text-gray-500 text-xs">{notification.timestamp}</span>
              </div>
              <button
                onClick={() => deleteNotification(notification.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
