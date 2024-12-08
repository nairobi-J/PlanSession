import React from 'react';

const Home = ({ openModal }) => {
  return (
    <>
    <div className=" bg-gradient-to-r  from-green-400 to-green-100 h-screen p-10">
    <img
            src="logo.png" // Replace with actual image if available
            alt="Saikat Singha"
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
      {/* Left side of the page */}
      <div className="w-1/3 p-4 mt-10">
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
            className="p-2  shadow-lg mb-4 w-1/3"
            onClick={() => openModal('guest')}
          >
            Sign Up As Host
          </button>
          <p className="mb-4">Or</p>
          <button
            className="p-2  shadow-lg w-1/3"
            onClick={() => openModal('host')}
          >
            Sign Up As Guest
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
          <p className="text-center mb-4">Join Our Community.......</p>
          <button
            className="p-2  shadow-xl w-1/3"
            onClick={() => openModal('login')}
          >
            Log In
          </button>
        </div>
      </div>
    </div>

  
    <div className=" px-6 py-10 bg-gradient-to-r  from-green-400 via-green-300  to-green-100 shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
      <p className="text-lg leading-8 text-center mb-6">
        We are a team of dedicated software engineers from <strong>Shahjalal University of Science and Technology (SUST)</strong>.
      </p>

      {/* Three-grid Layout for Team Introduction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img
            src="/nusrat_jahan_jerin.jpg" // Replace with actual image if available
            alt="Nusrat Jahan Jerin"
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold">Nusrat Jahan Jerin</h3>
          <p className="text-gray-700">Specializes in front-end development and user experience design.</p>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img
            src="/abu_sayied_sawon.jpg" // Replace with actual image if available
            alt="Abu Sayied Sawon"
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold">Abu Sayied Sawon</h3>
          <p className="text-gray-700">An expert in back-end development and database architecture.</p>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img
            src="/saikat_singha.jpg" // Replace with actual image if available
            alt="Saikat Singha"
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold">Saikat Singha</h3>
          <p className="text-gray-700">Focuses on project management, ensuring seamless collaboration and timely delivery.</p>
        </div>
      </div>

      <p className="mt-6 text-lg leading-8">
        Our mission is to simplify scheduling and collaboration, enabling teams and individuals to focus on what truly matters. 
        We leverage our expertise in software engineering to create tools that are not only functional but also intuitive and user-friendly.
      </p>
      <p className="mt-4 text-lg leading-8">
        Join us in revolutionizing the way meetings are scheduled and managed. Together, we can build a future where technology serves as an enabler, not a barrier.
      </p>
      <p className="mt-4 text-lg leading-8 text-center">
        For any inquiries, feel free to <strong>Contact Us</strong>. We are here to help!
      </p>
    </div>
    </>
  );
};

export default Home;
