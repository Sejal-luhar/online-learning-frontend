import React from 'react';
import Navbar from './Navbar';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-800 ">
        <Navbar />
      <div className="container mx-auto px-6 py-10">
        {/* About Us Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">About Us</h2>
          <p className="text-lg text-gray-600">
            LearnOnline is an online platform where we provide high-quality courses for learners worldwide.
            Our mission is to provide accessible and affordable education to all.
          </p>
        </div>

        {/* Our Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold text-blue-500 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-600">
              To empower individuals through flexible, high-quality education, helping them achieve their personal and professional goals.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold text-blue-500 mb-4">Our Vision</h3>
            <p className="text-lg text-gray-600">
              To become the leading global online learning platform that connects students with expert instructors.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">Our Values</h3>
          <p className="text-lg text-gray-600">
            We are committed to providing a supportive learning environment, fostering a culture of lifelong learning, and promoting personal growth.
          </p>
        </div>

        {/* Meet Our Team */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-500 text-center mb-6">Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww"
                alt="Team Member"
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h4 className="font-semibold text-xl text-blue-600">John Doe</h4>
              <p className="text-gray-500">CEO & Founder</p>
              <p className="text-gray-600 mt-2">
                John is a passionate educator with over 10 years of experience in the online learning industry.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
                alt="Team Member"
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h4 className="font-semibold text-xl text-blue-600">Jane Smith</h4>
              <p className="text-gray-500">Head of Education</p>
              <p className="text-gray-600 mt-2">
                Jane is dedicated to crafting high-quality courses and curating content that meets the needs of every learner.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
                alt="Team Member"
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h4 className="font-semibold text-xl text-blue-600">Mark Lee</h4>
              <p className="text-gray-500">Lead Developer</p>
              <p className="text-gray-600 mt-2">
                Mark is the backbone of our platform's technical team, ensuring that the website runs smoothly and securely.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Have any questions? <a href="/contact" className="text-blue-500 hover:underline">Contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
