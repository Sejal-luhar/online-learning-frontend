import React, { useState, useEffect } from 'react';
import API from '../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <div>
        {courses.map((course) => (
          <div key={course._id} className="mb-4 p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
