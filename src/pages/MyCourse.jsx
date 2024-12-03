import React, { useState, useEffect } from 'react';
import API from '../api'; // Ensure this is your Axios instance
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get('/courses/my-courses', {
          withCredentials: true, // Ensure credentials are included for session-based auth
        });

        console.log('Courses fetched:', response.data); // Debugging log
        setCourses(response.data); // Set the courses in state
      } catch (err) {
        console.error('Error fetching courses:', err); // Log error details
        setError('Failed to fetch your courses');
      }
    };

    fetchCourses();
  }, []);

  // If there are no courses or an error occurs
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (courses.length === 0) {
    return <div className="text-center text-gray-500">You are not enrolled in any courses yet.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-semibold text-blue-500 mb-6">My Enrolled Courses</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600">{course.title}</h3>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <p className="text-gray-500 mt-2">Instructor: {course.instructor.username}</p>
            <div className="mt-4 flex justify-between">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => navigate(`/course/${course._id}`)}
              >
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
