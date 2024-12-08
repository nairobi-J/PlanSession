import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {zones} from '../resource.js'
import axios from 'axios';
const Modal = ({ onClose, modalType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    timezone: '',
  });

  //const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  
  const [searchInput, setSearchInput] = useState("");
  const [filteredZones, setFilteredZones] = useState([]);
  const[message, setMessage] = useState("")

  // useEffect(() => {
  //   // Fetch a list of countries with their respective timezones
  //   fetch('https://world-time1.p.rapidapi.com/timezone')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const countries = data.map((country) => ({
  //         name: country.name,
  //         timezone: country.timezone,
  //       }));
  //       setCountries(countries);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching countries:', error);
  //     });
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'timezone') {
    
      setFormData((prevData) => ({
        ...prevData,
        [timezone]: value
      }));
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    // Filter zones based on input
    const filtered = zones.filter((country) =>
      country.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredZones(filtered);
  };

  const handleSelect = (timezone) => {
    setFormData((prev) => ({ ...prev, timezone }));
    setSearchInput(timezone); // Update input to the selected value
    setFilteredZones([]); // Clear suggestions
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validation logic for Login and Sign Up
    if (!formData.name || !formData.password) {
      alert('Username and password are required.');
      return;
    }

    // If modal type is 'host', check email as well
    if (modalType === 'host' && !formData.email) {
      alert('Email is required for Host.');
      return;
    }
    console.log(formData)

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
     

      if (response.data.success) {
        setMessage('Successfully signed up!');
      } else {
        console.log(error)
        setMessage(response.data?.msg || 'Error signing up');
      }
  
  } catch (error) {
      console.log(error)
      setMessage(error.response?.data?.msg || 'Error signing in');
  }

    // Successful login or sign-up
    onClose(); // Close modal after success
    navigate('/main');
  };

  const handleLogin = async(e) => {
    e.preventDefault();

    // Validation logic for Login and Sign Up
    if (!formData.name || !formData.password) {
      alert('Username and password are required.');
      return;
    }

    
    console.log(formData.name + " " + formData.password)

    const fName = formData.name;
    const fPass = formData.password;

    try {
      const response = await axios.post('http://localhost:5000/api/login', {fName, fPass});
     
      console.log(response.data.token)
      localStorage.setItem('token', response.data.token)

      if (response.data.success) {
        setMessage('Successfully logged in!');
      } else {
      
        setMessage(response.data?.msg || 'Error loggin in');
      }

     
  
  } catch (error) {
      console.log(error)
      setMessage(error.response?.data?.msg || 'Error logging in');
  }

    // Successful login or sign-up
    onClose(); // Close modal after success
    navigate('/main');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col gap-2 items-center justify-center">
      <form
        className="flex flex-col gap-4 justify-center items-center bg-blue-100 rounded-md p-6 w-[450px] sm:w-[500px] lg:w-[600px]"
        onSubmit={handleSubmit}
      >
        {/* Cross Button at the Top Right */}
        <button
          className="bg-red-500 place-self-end hover:bg-red-700 hover:text-white p-3 rounded-full"
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '15px' }}
        >
          <X size={24} />
        </button>

        {/* Username */}
        <div className="flex items-center gap-4 w-full">
          <label className="w-1/3">Username:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Username"
            className="border p-2 rounded-md w-2/3"
          />
        </div>

        {/* Email (only for Guest) */}
        {modalType === 'guest' && (
          <div className="flex items-center gap-4 w-full">
            <label className="w-1/3">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="border p-2 rounded-md w-2/3"
            />
          </div>
        )}

        {/* Password */}
        <div className="flex items-center gap-4 w-full">
          <label className="w-1/3">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            className="border p-2 rounded-md w-2/3"
          />
        </div>

        {/* Country and Timezone (only for Guest or Host) */}
        {(modalType === "guest" || modalType === "host") && (
      <>
        <div className="flex flex-col gap-2 justify-center items-baseline">
          <label>TimeZone:</label>
          <input
            type="text"
            name="timezone"
            value={searchInput}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
            placeholder="Type to search..."
          />
          {/* Suggestions Dropdown */}
          {filteredZones.length > 0 && (
            <ul className="border p-2 rounded-md max-h-40 overflow-y-auto">
              {filteredZones.map((zone, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-gray-200 p-1"
                  onClick={() => handleSelect(zone)}
                >
                  {zone}
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )}
    {modalType === 'login' && 
      ( <button
       type="submit" onClick={handleLogin}
       className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg w-full"
     >
       Log In
     </button>)
    }
    {modalType === 'guest' && 
      ( <button
       type="submit" onClick={handleSubmit}
       className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg w-full"
     >
       Guest Sign In
     </button>)
    }
    {modalType === 'host' && 
      ( <button
       type="submit" onClick={handleSubmit}
       className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg w-full"
     >
       Host Sign In
     </button>)
    }

        
      </form>
    </div>
  );
};

export default Modal;