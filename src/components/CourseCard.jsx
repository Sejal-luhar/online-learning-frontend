import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{course.title}</h2>
      <p>{course.description}</p>
      <p className="text-sm text-gray-500">Teacher: {course.teacher.username}</p>
    </div>
  );
};

export default CourseCard;
