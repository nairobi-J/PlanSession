import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ onClose, modalType }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    timezone: '',
  });

  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch a list of countries with their respective timezones
    fetch('https://world-time1.p.rapidapi.com/timezone')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.name,
          timezone: country.timezone,
        }));
        setCountries(countries);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'country') {
      const country = countries.find((c) => c.name === value);
      setFormData((prevData) => ({
        ...prevData,
        timezone: country ? country.timezone : '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic for Login and Sign Up
    if (!formData.username || !formData.password) {
      alert('Username and password are required.');
      return;
    }

    // If modal type is 'host', check email as well
    if (modalType === 'host' && !formData.email) {
      alert('Email is required for Host.');
      return;
    }

    // Successful login or sign-up
    onClose(); // Close modal after success
    navigate('/main');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col gap-4 items-center justify-center">
      <form
        className="flex flex-col gap-8 justify-center items-center bg-blue-100 rounded-md p-10"
        onSubmit={handleSubmit}
      >
        <div className="pl-60">
          <button
            className="bg-red-500 place-self-end hover:bg-red-700 hover:text-white"
            onClick={onClose}
          >
            <X size={10} />
          </button>
        </div>

        {/* Username */}
        <div className="flex flex-col gap-2 justify-center items-baseline">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your Username"
            className="border p-2 rounded-md"
          />
        </div>

        {/* Email (only for Host) */}
        {modalType === 'host' && (
          <div className="flex flex-col gap-2 justify-center items-baseline">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="border p-2 rounded-md"
            />
          </div>
        )}

        {/* Password */}
        <div className="flex flex-col gap-2 justify-center items-baseline">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            className="border p-2 rounded-md"
          />
        </div>

        {/* Country and Timezone (only for Guest or Host) */}
        {(modalType === 'guest' || modalType === 'host') && (
          <>
            <div className="flex flex-col gap-2 justify-center items-baseline">
              <label>Country:</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border p-2 rounded-md"
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 justify-center items-baseline">
              <label>Timezone:</label>
              <input
                type="text"
                name="timezone"
                value={formData.timezone}
                readOnly
                className="border p-2 rounded-md"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Modal;
