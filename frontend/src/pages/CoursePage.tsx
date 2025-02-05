import React from 'react';
import { useParams } from 'react-router-dom';

const CoursePage: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1 className="text-3xl font-semibold">Course Details - {id}</h1>
      <p>Details about the course will go here.</p>
    </div>
  );
};

export default CoursePage;
