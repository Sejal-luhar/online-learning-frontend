import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import Navbar from './Navbar';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false); // Track enrollment status

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await API.get(`/courses/${courseId}`);
        console.log('Course Data:', response.data);
        setCourse(response.data.course); // Set the course data
        setIsEnrolled(response.data.isEnrolled); // Set the enrollment status
        setLoading(false);
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('Failed to load course details');
        setLoading(false);
      }
    };
  
    fetchCourseDetails();
  }, [courseId]);
  

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token'); // or sessionStorage, or cookies
      const response = await API.post(
        `/courses/${courseId}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Enrollment successful:', response.data);
      setIsEnrolled(true);
    } catch (err) {
      console.error('API Error Response:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to enroll in the course.');
    }
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/progress`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Include cookies for session authentication
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const loggedInUserId = data.loggedInUserId; // Assuming backend sends the logged-in user's ID
          const studentProgress = data.course.students.find(
            (student) => student.studentId === loggedInUserId
          );
  
          setProgress(studentProgress ? studentProgress.progress : 0);
        } else {
          console.error('Failed to fetch progress:', data.message);
        }
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      }
    };
  
    fetchProgress();
  }, [courseId]);
  
  

  const handleRatingSubmit = async () => {
    if (!rating || !review) {
      setError('Please provide a rating and review.');
      return;
    }

    try {
      console.log('Submitting rating:', { rating, review });
      const response = await API.post(`/courses/${courseId}/rate`, { rating, review });
      console.log('Rating submitted successfully:', response.data);
      setRating(0);
      setReview('');
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error submitting rating:', err.response?.data || err.message);
      setError('Failed to submit rating. Please try again.');
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" bg-gray-100 rounded-lg shadow-lg">
      <Navbar />
      <div className="bg-white max-w-5xl mx-auto  rounded-lg shadow-md p-6">
        
        <h2 className="text-3xl font-semibold mb-4">{course.title}</h2>
        <p className="text-gray-700">{course.description}</p>

        {/* Enrollment Section */}
        <div className="mt-6">
          {isEnrolled ? (
            <p className="text-green-600 font-semibold">You are enrolled in this course!</p>
          ) : (
            <button
              onClick={handleEnroll}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enroll Now
            </button>
          )}
        </div>

        {/* Instructor Info */}
        {course.instructor ? (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-blue-600">Instructor</h3>
            <div className="bg-gray-50 p-4 rounded-lg mt-2 shadow-sm">
              <p className="text-lg font-medium">{course.instructor.username}</p>
              <p className="text-gray-600">{course.instructor.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500 mt-4">Instructor information not available</p>
        )}

        {/* Course Content */}
        {course.content && course.content.length > 0 ? (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-blue-600">Course Content</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
              {course.content.map((lesson, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-xl font-medium">{`Lesson ${index + 1}`}</h4>
                  <p className="text-gray-700">{lesson}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4">No content available for this course.</p>
        )}

        {/* Progress and Rating Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-blue-600">Your Progress</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mt-2">
            <p className="text-lg">Progress: {progress}%</p>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-blue-600">Rate this Course</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mt-2">
              <div className="flex flex-col space-y-2">
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="border border-gray-300 p-2 rounded"
                  placeholder="Rate 1 to 5"
                />
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Leave your review"
                  className="border border-gray-300 p-2 rounded w-full mt-2"
                />
                <button
                  onClick={handleRatingSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
