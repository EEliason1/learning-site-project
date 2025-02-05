import React from "react";

interface CourseCardProps {
  name: string;
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, progress }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{name}</h2>
      <div className="mt-2">
        <progress value={progress} max={100} className="w-full"></progress>
        <p>{progress}% Complete</p>
      </div>
    </div>
  );
};

export default CourseCard;
