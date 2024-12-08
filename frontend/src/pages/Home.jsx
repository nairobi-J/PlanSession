import React from 'react';

const Home = ({ openModal }) => {
  return (
    <div className="relative  bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      {/* Background Image Scattered (Use actual image URLs or paths) */}
      <div className="absolute top-10 left-10 z-0 opacity-20">
        <img
          src="/background-image1.jpg" // Replace with your image URL
          alt="Background 1"
          className="h-48 w-48 rounded-full"
        />
      </div>
      <div className="absolute top-20 right-10 z-0 opacity-15">
        <img
          src="/background-image2.jpg" // Replace with your image URL
          alt="Background 2"
          className="h-60 w-60 rounded-full"
        />
      </div>

      {/* Logo at the Left End */}
      <div className="flex justify-start pl-10 z-10 relative">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-32 w-auto"
        />
      </div>

      {/* Main Content Section */}
      <div className="flex z-10 relative">
        {/* Left side of the page */}
        <div className="w-1/3 p-4">
          <div className="mb-20 shadow-lg p-6 rounded-lg bg-white bg-opacity-90">
            <h1 className="text-2xl font-bold">Take a Break</h1>
            <h2 className="mt-4 text-xl">Plan Your Meeting Smoothly</h2>
            <p className="mt-4 text-gray-600">Join a new era of seamless collaboration and scheduling.</p>
          </div>

          {/* Buttons for Sign In options */}
          <div className="flex flex-col justify-center items-center mt-10">
            <button
              className="p-2 bg-blue-300 shadow-lg mb-4 w-1/3 hover:bg-blue-500"
              onClick={() => openModal('host')}
            >
              Sign Up As Host
            </button>
            <p className="mb-4">Or</p>
            <button
              className="p-2 bg-blue-300 shadow-lg w-1/3 hover:bg-blue-500"
              onClick={() => openModal('guest')}
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
            <p className="text-center mb-4 text-lg text-gray-600">Join Our Community</p>
            <button
              onClick={() => openModal('login')}
              className="px-4 p-3 bg-blue-300 hover:bg-blue-600 rounded-lg text-black"
            >
              Log In
            </button>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="mt-20 px-6 py-10 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 shadow-xl rounded-lg relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">About Us</h2>
        <p className="text-lg text-gray-100 leading-8 text-center mb-6">
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

        <p className="mt-6 text-lg  leading-8">
          Our mission is to simplify scheduling and collaboration, enabling teams and individuals to focus on what truly matters. 
          We leverage our expertise in software engineering to create tools that are not only functional but also intuitive and user-friendly.
        </p>
        <p className="mt-4 text-lg  leading-8">
          Join us in revolutionizing the way meetings are scheduled and managed. Together, we can build a future where technology serves as an enabler, not a barrier.
        </p>
        <p className="mt-4 text-lg text-gray-100 leading-8 text-center">
          For any inquiries, feel free to <strong>Contact Us</strong>. We are here to help!
        </p>
      </div>
    </div>
  );
};

export default Home;
