import React from 'react';

const Home = ({ openModal }) => {
  return (
    <div className="mt-20 flex">
      {/* Left side of the page */}
      <div className="w-1/3 p-4">
        <div className="mb-20 shadow-lg p-2 rounded-lg">
          <h1>Take a Break</h1>
          <br />
          <h1>Plan Your Meeting Smoothly</h1>
          <br />
          <p>Join a new era of so......</p>
        </div>

        {/* Buttons for Sign In options */}
        <div className="flex flex-col justify-center items-center">
          <button
            className="p-2 bg-blue-300 shadow-lg mb-4 w-1/3"
            onClick={() => openModal('host')}
          >
            Sign In As Host
          </button>
          <p className="mb-4">Or</p>
          <button
            className="p-2 bg-blue-300 shadow-lg w-1/3"
            onClick={() => openModal('')}
          >
            Sign In As Guest
          </button>
        </div>
      </div>

      {/* Right side of the page */}
      <div className="w-2/3 p-4 ml-20">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src="/calendar.webp"
            alt="test image"
            className="w-1/2 h-1/2 p-6 rounded-lg shadow-lg border border-gray-300 mb-4"
          />
          <p className="text-center mb-4">Join Our Community</p>
          <button className="p-2 bg-blue-300 shadow-lg w-1/5">Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
