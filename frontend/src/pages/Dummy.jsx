import React from 'react';

const Dummy = () => {
  return (
    <div className="font-sans bg-gray-100">

      {/* Header Section */}
      <header className="bg-gradient-to-r from-green-500 to-green-200 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Meeting Scheduler</h1>
          <p className="text-xl">Streamline your meeting scheduling process and manage your time efficiently.</p>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800">Why Choose Our Scheduler?</h2>
          <p className="text-lg text-gray-600 mt-4">
            We offer a simple yet powerful scheduling tool to help you organize meetings, sync calendars, and ensure seamless communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-600">Automated Scheduling</h3>
            <p className="text-gray-600 mt-4">Automatically sync with your calendar to book meeting slots without the back-and-forth emails.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-600">Customizable Availability</h3>
            <p className="text-gray-600 mt-4">Set up your availability based on time zones and preferences for smoother scheduling.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-600">Real-Time Notifications</h3>
            <p className="text-gray-600 mt-4">Stay updated with real-time notifications on meeting confirmations, changes, and cancellations.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800">How It Works</h2>
          <p className="text-lg text-gray-600 mt-4">
            Follow these simple steps to start scheduling your meetings effortlessly.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1 text-center p-6">
            <h3 className="text-2xl font-semibold text-green-600">Step 1</h3>
            <p className="text-gray-600 mt-4">Create an account and sync your calendar with our tool.</p>
          </div>
          <div className="flex-1 text-center p-6">
            <h3 className="text-2xl font-semibold text-green-600">Step 2</h3>
            <p className="text-gray-600 mt-4">Set your availability and allow others to book slots during open times.</p>
          </div>
          <div className="flex-1 text-center p-6">
            <h3 className="text-2xl font-semibold text-green-600">Step 3</h3>
            <p className="text-gray-600 mt-4">Receive notifications and reminders for upcoming meetings.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800">Pricing Plans</h2>
          <p className="text-lg text-gray-600 mt-4">Choose a plan that suits your needs, with flexible pricing options for every type of user.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-600">Basic Plan</h3>
            <p className="text-gray-600 mt-4">Free plan with essential features like calendar syncing and availability setup.</p>
            <p className="text-xl font-semibold text-green-600 mt-4">$0 / month</p>
          </div>

          {/* Plan 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-600">Pro Plan</h3>
            <p className="text-gray-600 mt-4">Advanced features including customizable availability and real-time notifications.</p>
            <p className="text-xl font-semibold text-green-600 mt-4">$10 / month</p>
          </div>

          {/* Plan 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-600">Enterprise Plan</h3>
            <p className="text-gray-600 mt-4">All features included, with priority support and team collaboration tools.</p>
            <p className="text-xl font-semibold text-green-600 mt-4">$30 / month</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800">What Our Users Say</h2>
          <p className="text-lg text-gray-600 mt-4">Hear from some of our satisfied users who trust us to manage their meetings.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Testimonial 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex-1 mx-4">
            <p className="text-lg text-gray-600">"This meeting scheduler has made it so much easier to organize meetings and communicate with my clients. Highly recommended!"</p>
            <p className="mt-4 text-gray-800 font-semibold">John Doe, CEO</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex-1 mx-4">
            <p className="text-lg text-gray-600">"The automated scheduling feature saved me so much time. I can now focus on more important tasks!"</p>
            <p className="mt-4 text-gray-800 font-semibold">Jane Smith, Project Manager</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-green-400 via-green-300 to-green-100 text-center py-16">
        <h2 className="text-3xl font-semibold text-white mb-6">Ready to Boost Your Productivity?</h2>
        <p className="text-lg text-white mb-6">Start scheduling meetings effortlessly and boost your productivity today.</p>
       
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="text-center">
          <p className="text-sm mb-2">&copy; 2024 Meeting Scheduler. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
            <a href="#" className="hover:text-blue-400">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Dummy;
