import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Hero Section */}
      <header className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Learn Anytime, Anywhere</h1>
        <p className="text-lg md:text-2xl mb-8">
          Join millions of learners worldwide and unlock your potential with our expert-led courses.
        </p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>
          <Link
            to="/auth"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
              <p>Learn from industry professionals with years of experience.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
              <p>Access courses anytime, anywhere on any device.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Wide Course Variety</h3>
              <p>Choose from hundreds of courses across various disciplines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Students Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "This platform has transformed the way I learn. Highly recommended!"
              </p>
              <p className="font-bold">- Jane Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "The courses are detailed and well-structured. Great experience!"
              </p>
              <p className="font-bold">- John Smith</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "I love the flexibility of learning at my own pace."
              </p>
              <p className="font-bold">- Sarah Lee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <footer className="py-12 bg-blue-600 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Start Learning Today!</h2>
        <p className="text-lg mb-6">Sign up and join our community of learners.</p>
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg"
        >
          Join Now
        </Link>
      </footer>
    </div>
  );
};

export default Home;
