import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // Make sure this API instance is configured
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [courses, setCourses] = useState([]); // State to hold courses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear user data
    navigate("/auth"); // Redirect to login
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/courses", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });
        setCourses(response.data); // Update courses state
      } catch (err) {
        console.error(
          "Error fetching courses:",
          err.response?.data || err.message
        );
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white shadow-md h-screen p-4">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <button
                className="text-white hover:text-blue-800 font-medium"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </button>
            </li>
            

            <li>
              <button
                className="text-white hover:text-blue-800 font-medium"
                onClick={() => navigate("/about-us")}
              >
                About Us
              </button>
            </li>
            <li>
              <button
                className="text-red-600 hover:text-red-800 font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to your Dashboard!
          </h1>
          <p>
            Here, you can access your courses, manage your profile, and more.
          </p>

          {/* Courses Section */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
            {loading ? (
              <p>Loading courses...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-lg shadow-md p-4 border border-gray-300"
                  >
                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <Link
                      to={`/courses/${course._id}`} // Dynamically set the course ID in the URL
                      className="text-blue-500 hover:underline"
                    >
                      View Course
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>No courses found. Start enrolling in courses now!</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
